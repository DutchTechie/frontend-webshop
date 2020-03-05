import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

const MUTATE: string = 'MUTATE';
const DETAILS: string = 'DETAILS';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  noImageFoundImagePath = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";
  visitedDetailsPage: boolean = false;
  productPageMode: string = null;
  defaultImageUri: string = this.noImageFoundImagePath;
  updatedImageSub: Subscription;
  userSubscription: Subscription;
  user: User = null;
  backToInfo = false;
  currentProduct: Product;

  @ViewChild('imagePath', {static: true}) imagePath: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private productService: ProductService) {}

  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.productPageMode = this.determineProductPageMode();
    this.user = this.getLoggedInUser();

    if (productId !== null) {
      this.productService.fetchProduct(productId).subscribe(product => {
        this.currentProduct = product;
        console.log(product)
        if (this.currentProduct.imagePath !== "" || this.currentProduct,this.imagePath == null) { // TODO: check for null?
          this.defaultImageUri = this.currentProduct.imagePath;
        }
      });
    }

    // todo
    this.updatedImageSub = this.productService.updatedImagePath.subscribe(data => {
      this.defaultImageUri = data;
    });
  }

  onError() {
    this.defaultImageUri = this.noImageFoundImagePath;
    this.currentProduct.imagePath = null;
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

  switchToMutateMode() {
    this.visitedDetailsPage = true;
    this.productPageMode = MUTATE;
  }

  switchToDetailsMode() {
    this.productPageMode = DETAILS;
  }

  handleOnBackPressed(event) {
    if (event) {
      this.productPageMode = DETAILS;
    } else {
      this.router.navigate(['/']);
    }
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
    if (this.updatedImageSub != null) {
      this.updatedImageSub.unsubscribe();
    }
  }

  addNewProduct() {
    this.productService.addNewProduct(this.currentProduct).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['']);
  }
}
