import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';
import { Product } from '../home/product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  isEditMode = false
  isCreateMode = false
  private userSub : Subscription;
  user: User = null
  backToInfo = false
  currentProduct : Product;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService, 
              private router: Router,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {

      this.isEditMode = this.activatedRoute
        .snapshot
        .paramMap
        .get('mode') == "edit"? true : false

      this.isCreateMode = this.activatedRoute
        .snapshot
        .paramMap
        .get('mode') == "create"? true : false

      console.log(this.isEditMode)

      this.userSub = this.authService.user.subscribe(user => {
        if (user == null) {
          this.user = new User("", "", false)
          return
        }
        this.user = user
      })

      const id: string = this.activatedRoute
        .snapshot
        .paramMap
        .get('id');

      if (id != null) {
        this.productService.fetchProduct(id).subscribe(product =>{ 
          this.currentProduct = product;
          console.log(product);
        });
      } else {

        // TODO: Use a loop for this
        this.currentProduct = new Product(
          "-1", null, null, null, null, null
        );
      }

      // console.log(this.currentProduct);
    }

    ngOnDestroy() {
      this.userSub.unsubscribe()
    }

  onSwitchMode() {
      this.isEditMode = !this.isEditMode
  }

  addNewProduct() {
    this.productService.addNewProduct(this.currentProduct).subscribe(data => {
      console.log(data);
    })
    this.router.navigate([''])
  }

  onBackClicked() {
    if (this.isEditMode) {
      if (this.backToInfo) {
        this.isEditMode = false
        return;
      }
    }
    this.router.navigate([''])
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
        return
    }
    if (this.isCreateMode) {
      console.log("Add a new product")
      this.addNewProduct()
      return
    }
    if (this.isEditMode) {
      console.log("save new information")
      this.productService.updateProduct(this.currentProduct).subscribe(data => {
        console.log(data);
      })
      
    } else {
      if (this.user.isAdmin && !this.isCreateMode) { // TODO: I don't think the isCreate needs to be here
        this.isEditMode = true
        this.backToInfo = true
      }
      if (this.user.isAdmin == false) {
        let id = this.user.userId;
        this.shoppingCartService.addToCart(id, this.currentProduct.id)
          .subscribe(data => console.log(data));
      }
    }
    this.router.navigate([''])
  }
}
