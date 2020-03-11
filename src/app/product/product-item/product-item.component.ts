import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { User } from '../../../models/user.model';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as ProductActions from '../../../reducers/product.actions';
import { map, switchMap } from 'rxjs/operators';

const MUTATE: string = 'MUTATE';
const DETAILS: string = 'DETAILS';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {
  noImageFoundImagePath = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";
  visitedDetailsPage: boolean = false;
  productPageMode: string = null;
  defaultImageUri: string = this.noImageFoundImagePath;
  updatedImageSub: Subscription;
  userSubscription: Subscription;
  user: User = null;
  backToInfo = false;
  currentProduct: Product;
  failedLoadingImage: boolean = false;
  private storeSub: Subscription;
  id: number;
  // products: Observable <{products: Product[]}>  // TODO: Hopefully we can delete this later somehow

  @ViewChild('imagePath', {static: true}) imagePath: ElementRef;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const productId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.productPageMode = this.determineProductPageMode();
    this.user = this.getLoggedInUser();

    // TODO: Fetch the right product
    if (productId !== null) {
      this.activatedRoute.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(id => {
            this.id = id;
            return this.store.select('products');
          }),
          map(productState => {
            return productState.products.find((product, index) => {
              return +product.id === this.id;
            })
          })
        ).subscribe(product => {
          this.currentProduct = product;
          if (this.currentProduct.imagePath !== "" || this.currentProduct.imagePath == null) { // TODO: check for null?
            this.defaultImageUri = this.currentProduct.imagePath;
          }
        })
    }

    // todo
    this.updatedImageSub = this.productService.updatedImagePath.subscribe(data => {
      this.failedLoadingImage = false;
      this.defaultImageUri = data;
    });
  }

  onError() {
    this.failedLoadingImage = true;
    this.defaultImageUri = this.noImageFoundImagePath;
    this.currentProduct.imagePath = this.noImageFoundImagePath //null;
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
    // this.userSubscription = this.authenticationService.user.subscribe(user => {
    //   userToAsssignValueTo = user;
    // });
    return userToAsssignValueTo;
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }

    if (this.userSubscription != null) {
      this.userSubscription.unsubscribe();
    }
    if (this.updatedImageSub != null) {
      this.updatedImageSub.unsubscribe();
    }
  }

  handleProductToMutate(product: Product) {
    this.store.dispatch(new ProductActions.StartMutatingProduct(product));
  }
}
