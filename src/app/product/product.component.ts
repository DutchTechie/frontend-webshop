import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';
import { Product } from '../home/product.model';

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

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService, 
              private router: Router,
              private productService: ProductService) {

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
    }

    ngOnDestroy() {
      this.userSub.unsubscribe()
    }

  onSwitchMode() {
      this.isEditMode = !this.isEditMode
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
        return
      }
      if (this.isEditMode) {
        console.log("save new information")

        // For testing
        const product: Product = new Product(
          "2", "shoe", "desc", "path", 500, 2
        )
        this.productService.updateProduct(product).subscribe(data => {
          console.log(data);
        })
        
      } else {
        if (this.user.isAdmin && !this.isCreateMode) { // TODO: I don't think the isCreate needs to be here
          this.isEditMode = true
          this.backToInfo = true
        }
        if (this.user.isAdmin == false) {
          console.log("Add to cart")
        }
      }
  }
}
