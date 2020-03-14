/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ShoppingCartActions from './shopping-cart.actions';
import { Cart } from 'src/models/cart.model';
import { ShoppingCart } from 'src/models/shopping-cart.model';

//=============================================================================

export interface CartResponseData {
  userId: number;
  productId: number;
  amount: number;
}

const handleError = (errorResponse: any) => {
  const errorMessage: string = 'An unknown error has occurred';
  console.log(errorMessage);
  return of(new ShoppingCartActions.AddOrUpdateCartFail(errorMessage));
}

const handleSucessfulAddOrUpdateCart = () => {
  return new ShoppingCartActions.AddOrUpdateCartSuccess();
}

const getCorrectRequest = (http: HttpClient, cart: Cart) => {
  const shoppingCartUri = `http://localhost:8080/shoppingCart`;
  if (cart.userId) {
    return http.post<Cart>(
      shoppingCartUri,
      cart
    )
  }
}

//=============================================================================

@Injectable()
export class ShoppingCartEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  startAddingOrUpdatingCart = this.actions$.pipe(
    ofType(ShoppingCartActions.ADD_OR_UPDATE_CART),
    switchMap((data: ShoppingCartActions.AddOrUpdateCart) => {
      console.log(data.payload);
      return getCorrectRequest(this.http, data.payload)
      .pipe(
        map(() => {
          console.log("Adding or updating cart");
          return handleSucessfulAddOrUpdateCart();
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  fetchShoppingCart = this.actions$.pipe(
    ofType(ShoppingCartActions.FETCH_SHOPPING_CART),
    switchMap((shoppingCartActions: ShoppingCartActions.FetchShoppingCart) => {
      return this.http.get(
        `http://localhost:8080/shoppingCart/${shoppingCartActions.payload}`
      ).pipe(
      map((shoppingCart: [ShoppingCart]) => {
        shoppingCart.map((cart) => {
          cart.state = 'normal';
          cart.visible = true;
        })
        console.log(shoppingCart);
        return new ShoppingCartActions.FetchSuccess(shoppingCart);
      }),
      catchError(errorResponse => {
        return handleError(errorResponse);
      }))
    })
  );


  @Effect({dispatch: false})
  productsDeleteOneProduct = this.actions$.pipe(
    ofType(ShoppingCartActions.DELETE_CART_ITEM),
    switchMap((productData: ShoppingCartActions.DeleteCartItem) => {
      console.log("deleting a shopping cart item")
      let userId: number = productData.payload.userId;
      let productId: number = productData.payload.productId;
      return this.http.delete<Cart>(`http://localhost:8080/shoppingCart/${userId}/${productId}`)
        .pipe(
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect({dispatch: false})
  productsDeleteAllProducts = this.actions$.pipe(
    ofType(ShoppingCartActions.DELETE_ALL_CART_ITEMS),
    switchMap((productData: ShoppingCartActions.DeleteAllCartItems) => {
      let userId = productData.payload;
      return this.http.delete(`http://localhost:8080/shoppingCart/${userId}`)
        .pipe(
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )
}

//==============================================================================
