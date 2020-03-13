/*****************************************************************************
Controls which mode an administrator is in and loads a product with the
corresponding id, if any, in the address bar.

@author
******************************************************************************/

//=============================================================================

import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map, switchMap } from 'rxjs/operators';

export const MUTATE: string = 'MUTATE';
export const DETAILS: string = 'DETAILS';

//=============================================================================

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

//=============================================================================

export class ProductItemComponent {
  private storeSub: Subscription;
  visitedDetailsPage: boolean = false;
  productPageMode: string = null;
  updatedImageSub: Subscription;
  currentProduct: Product;
  failedLoadingImage: boolean = false;

  @ViewChild('imagePath', {static: true}) imagePath: ElementRef;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.productPageMode = mode.toUpperCase();
    const productId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.resolveProductByIdUsingAddressBar(productId);
    this.updateImageSubscription();
  }

  private resolveProductByIdUsingAddressBar(productId: number): void {
    if (productId !== null) {
      let id: number;
      this.activatedRoute.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(productId => {
            id = productId;
            return this.store.select('products');
          }),
          map(productState => {
            return productState.products.find((product) => {
              return +product.id === id;
            })
          })
        ).subscribe(product => {
          if (!product) {
            this.loadImageNotfound();
            this.router.navigate(['/']); // TODO: Update error message
          } else {
            this.currentProduct = product;
          }
        })
    }
  }

  private updateImageSubscription() {
    this.updatedImageSub = this.productService.updatedImagePath.subscribe(data => {
      this.failedLoadingImage = false;
      this.currentProduct.imagePath = data;
    });
  }

  onError() {
    this.failedLoadingImage = true;
    this.loadImageNotfound();
  }

  loadImageNotfound() {
    const noImageFoundImagePath = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";
    this.currentProduct.imagePath = noImageFoundImagePath;
  }

  handleSwitchToEditMode() {
    this.visitedDetailsPage = true;
    this.productPageMode = MUTATE;
  }

  handleOnBackPressed(event) {
    if (event) {
      this.productPageMode = DETAILS;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.updatedImageSub != null) {
      this.updatedImageSub.unsubscribe();
    }
  }
}

//=============================================================================
