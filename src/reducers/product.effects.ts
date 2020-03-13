/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ProductActions from './product.actions';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Product } from 'src/models/product.model';
import { of } from 'rxjs';

//=============================================================================

export interface ProductResponseData {
  id: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  stock: number
}

const handleFetching = (
  id: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  stock: number
) => {
  const product = new Product(
    id, name, description, imagePath, price, stock, 'normal', true
  )

  return new ProductActions.FetchSuccess(
    product
  )
}

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    // What of does, is, it emits values in a sequence, depending on
    // how many parameters you have. So, of(1, 2, 3)
    // Subscribing to this, means you'll get the output: 1, 2, 3. That's all!
    return of(new ProductActions.MutateFail(errorMessage));
  }
  return of(new ProductActions.MutateFail(errorMessage));
}

const handleSucessfulMutation = () => {
  return new ProductActions.MutateSuccess(true);
}

const getCorrectMutationRequest = (http: HttpClient, product: Product) => {
  const productsUri = `http://localhost:8080/products`;
  if (product.id) {
    return http.put<ProductResponseData>(
      productsUri,
      product
    )
  }
  return http.post<ProductResponseData>(
    productsUri,
    product
  )
}

//=============================================================================

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect({dispatch: false})
  productsDeleteOneProduct = this.actions$.pipe(
    ofType(ProductActions.DELETE_PRODUCT),
    switchMap((productData: ProductActions.DeleteProduct) => {
      let id: number = productData.payload;
      console.log(`Deleting product with id:\t${id}`);
      return this.http.delete<Product>(`http://localhost:8080/products/${id}`)
        .pipe(
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect({dispatch: false})
  productsDeleteAllProducts = this.actions$.pipe(
    ofType(ProductActions.DELETE_ALL_PRODUCTS),
    switchMap(() => {
      console.log(`Deleting all products!`);
      return this.http.delete(`http://localhost:8080/products`)
        .pipe(
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect()
  productsFetchOneProduct = this.actions$.pipe(
    ofType(ProductActions.FETCH_START),
    switchMap((productData: ProductActions.FetchStart) => {
      return this.http
        .get<Product>(
          `http://localhost:8080/products/${productData.payload}`
        )
        .pipe(
          map(responseData => {
            return handleFetching(
              responseData.id,
              responseData.name,
              responseData.description,
              responseData.imagePath,
              responseData.price,
              responseData.stock
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  startMutatingProduct = this.actions$.pipe(
    ofType(ProductActions.START_MUTATE),
    switchMap((data: ProductActions.StartMutatingProduct) => {
      return getCorrectMutationRequest(this.http, data.payload)
      .pipe(
        map(() => {
          return handleSucessfulMutation();
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  fetchAllProducts = this.actions$.pipe(
    ofType(ProductActions.FETCH_PRODUCTS),
    switchMap(() => {
      return this.http.get<Product[]>(
        `http://localhost:8080/products`
      );
    }),
    map(products => {
      return products.map(product => {
        return {
          ...product,
          state: 'normal',
          visible: true
        };
      });
    }),
    map(products => {
      return new ProductActions.SetProducts(products);
    })
  );
}

//==============================================================================
