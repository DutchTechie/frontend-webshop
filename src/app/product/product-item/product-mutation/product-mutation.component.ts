/*****************************************************************************
Represents a form for either creating a new product or
editing an existing one.

@author
******************************************************************************/

//=============================================================================

import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as ProductActions from '../../../../reducers/product.actions';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//=============================================================================

@Component({
  selector: 'app-product-mutation',
  templateUrl: './product-mutation.component.html',
  styleUrls: ['./product-mutation.component.css']
})

//=============================================================================

export class ProductMutationComponent implements OnInit {
  @Input() newOrExistingProduct: Product;
  @Input() visitedDetailsPage: boolean;
  @Input() failedLoadingImage: boolean;
  productForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.newOrExistingProduct = this.getInitializedProduct(this.newOrExistingProduct);
    this.initializeForm();
    this.keepUpdatingProductImage('imagePath');
  }

  //=============================================================================

  private getInitializedProduct(productToInitialize: Product) {
    return (productToInitialize == null) ? new Product() : productToInitialize;
  }

  initializeForm() {
    this.productForm = new FormGroup({
      'name': new FormControl(this.newOrExistingProduct.name, Validators.required),
      'imagePath': new FormControl(this.newOrExistingProduct.imagePath, { updateOn: 'blur'}),
      'description': new FormControl(this.newOrExistingProduct.description),
      'stock': new FormControl(this.newOrExistingProduct.stock, [ Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),  // TODO: Consider putting validator in misc
      'price': new FormControl(this.newOrExistingProduct.price, [ Validators.required, Validators.pattern(/^[0-9]+(.[0-9]{0,2})?$/)]),
    });
  }

  private keepUpdatingProductImage(formControlName: string) {
    this.productForm.get(formControlName).valueChanges.subscribe(value => {
      this.updateImage(value);
    });
  }

  updateImage(imagePath: string) {
    this.productService.updatedImagePath.next(imagePath);
  }

  //=============================================================================

  onSubmit() {
    const productFormIsValid = this.productForm.valid;
    const productValueSubmittedByUser = this.productForm.value;

    if  (productFormIsValid) {
      const productToMutate = {
        ...productValueSubmittedByUser,
        id: this.newOrExistingProduct.id
      };
      this.mutateProduct(productToMutate);
    }
  }

  private mutateProduct(product: Product) {
    this.store.dispatch(new ProductActions.StartMutatingProduct(product));
    this.store.select('products').subscribe(productState => {
      if (productState.redirect) { this.router.navigate(['/']); }
    });
  }

  //=============================================================================

  handleOnBackPressed() {
    const userVisitedDetailsPage: boolean = this.visitedDetailsPage == true;
    const currentProductIsNotNew: boolean = this.newOrExistingProduct.id !== null;
    const verifyVisitedDetailsPage = (userVisitedDetailsPage && currentProductIsNotNew);

    if (verifyVisitedDetailsPage) {
      const productDetailsUrl = `/product/details/${this.newOrExistingProduct.id}`;
      this.router.navigate([productDetailsUrl]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}

//=============================================================================
