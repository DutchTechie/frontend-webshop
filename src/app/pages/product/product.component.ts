import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

export const MUTATE: string = 'MUTATE';
export const DETAILS: string = 'DETAILS';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  isEditMode = false
  isCreateMode = false
  private userSubscription: Subscription;
  user: User = null
  backToInfo = false
  currentProduct: Product;

  productPageMode: string = null;
  defaultImageUri: string = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService, 
              private router: Router,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.productPageMode = this.determineProductPageMode(); 
    this.user = this.getLoggedInUser();

    if (this.productPageMode === MUTATE) {
      if (this.userIsAdmin(this.user) === false) {
        this.redirectUserToLoginPage();
      }
    }

    if (productId !== null) {
      this.productService.fetchProduct(productId).subscribe(product => {
        this.currentProduct = product;
        if (this.currentProduct.imagePath !== "") {
          this.defaultImageUri = this.currentProduct.imagePath;
        }
      });
    }
  }

  private determineProductPageMode(): string {
    const mode = this.activatedRoute.snapshot.paramMap.get('mode');
    switch (mode) {
      case "mutate": return MUTATE;
      case "details": return DETAILS;
      default:
        console.log("Error: cannot determine which mode the product page is in.");
        return null;
    }
  }

  redirectUser(pageToRedirectUserTo) {
    this.router.navigate([pageToRedirectUserTo]);
  }

  private userIsAdmin(user: User): boolean {
    if (user === null) {
      return false;
    }
    return (user.isAdmin === true);
  }

  switchBetweenMutateAndDetailsMode() {
  }

  switchToMutateMode() {
    this.productPageMode = MUTATE;
  }

  switchToDetailsMode() {
    this.productPageMode = DETAILS;
  }

  private getLoggedInUser(): User {
    let userToAsssignValueTo: User = null;
    this.userSubscription = this.authenticationService.user.subscribe(user => {
      userToAsssignValueTo = user;
    });
    return userToAsssignValueTo;
  }

  ngOnDestroy() {
    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
  }

  private redirectUserToLoginPage() {
    this.router.navigate(['/login']);
  }

  addNewProduct() {
    this.productService.addNewProduct(this.currentProduct).subscribe(data => {
      console.log(data);
    })
    this.router.navigate([''])
  }

  onBackClicked() {
    // TODO: Implement back logic
    this.router.navigate(['']);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
        return;
    }
    if (this.isCreateMode) {
      console.log("Add a new product")
      this.addNewProduct()
      this.router.navigate([''])
      return;
    }
    if (this.isEditMode) {
      console.log("save new information")
      this.productService.updateProduct(this.currentProduct).subscribe(data => {
        console.log(data);
        this.router.navigate([''])
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
        this.router.navigate([''])
      }
    }
  }
}
