/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Action } from '@ngrx/store';
import { Product } from 'src/models/product.model';
import { Cart } from 'src/models/cart.model';
import { ShoppingCart } from 'src/models/shopping-cart.model';

export const START_CHECK_AVAILABLE_PRODUCTS = '[ShoppingCart] Start Check Available Products';
export const START_CHECK_AVAILABLE_PRODUCTS_FAIL = '[ShoppingCart] Start Check Available Products Fail';
export const REMOVE_UNUSABLE_CARTS = '[ShoppingCart] Remove Unusable Carts';
export const START_CHECK_AVAILABLE_PRODUCTS_SUCCESS = '[ShoppingCart] Start Check Available Products Success';

export const SET_SHOPPING_CART = '[ShoppingCart] Set Shopping Cart';
export const FETCH_SHOPPING_CART = '[ShoppingCart] Fetch Shopping Cart';
export const FETCH_START = '[ShoppingCart] Fetch Cart Start';
export const FETCH_SUCCESS = '[ShoppingCart] Fetch Shopping Cart Success';

export const ADD_OR_UPDATE_CART = '[Cart] Start Adding New Cart Or Updating Cart';
export const ADD_OR_UPDATE_CART_FAIL = '[Cart] Adding New Cart Or Updating Cart Fail';
export const ADD_OR_UPDATE_CART_SUCCESS = '[Cart] Adding New Cart Or Updating Cart Success';
export const CLEAR_ERROR = '[Cart] Clear Error';

export const DELETE_CART_ITEM = '[Cart] Delete Cart Item';
export const DELETE_ALL_CART_ITEMS = '[Cart] Delete All Cart Items';
export const DELETE_ALL_CART_ITEMS_SUCCESS = '[Cart] Delete All Cart Items Success';

//=============================================================================

export class StartCheckAvailableProducts implements Action {
  readonly type = START_CHECK_AVAILABLE_PRODUCTS;
}

export class StartCheckAvailableProductsFail implements Action {
  readonly type = START_CHECK_AVAILABLE_PRODUCTS_FAIL;
}

export class RemoveUnusableCarts implements Action {
  readonly type = REMOVE_UNUSABLE_CARTS;
}

export class StartCheckAvailableProductsSuccess implements Action {
  readonly type = START_CHECK_AVAILABLE_PRODUCTS_SUCCESS;
}

//=============================================================================

export class SetShoppingCart implements Action {
  readonly type = SET_SHOPPING_CART;
}

export class FetchShoppingCart implements Action {
  readonly type = FETCH_SHOPPING_CART;

  constructor(public payload: number) { console.log(payload) }
}

export class FetchStart implements Action {
  readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS;

  constructor(public payload: [ShoppingCart]) {}
}

//=============================================================================

export class AddOrUpdateCart implements Action {
  readonly type = ADD_OR_UPDATE_CART;

  constructor(public payload: Cart) { console.log(payload) }
}

export class AddOrUpdateCartFail implements Action {
  readonly type = ADD_OR_UPDATE_CART_FAIL;

  constructor(public payload: string) {}
}

export class AddOrUpdateCartSuccess implements Action {
  readonly type = ADD_OR_UPDATE_CART_SUCCESS;
}

//=============================================================================

export class DeleteCartItem implements Action {
  readonly type = DELETE_CART_ITEM;

  constructor(public payload: {userId: number, productId: number}) {}
}

export class DeleteAllCartItems implements Action {
  readonly type = DELETE_ALL_CART_ITEMS;

  constructor(public payload: number) {}
}

export class DeleteAllCartItemsSuccess implements Action {
  readonly type = DELETE_ALL_CART_ITEMS_SUCCESS;
}

//=============================================================================

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type ShoppingCartActions =
  | StartCheckAvailableProducts
  | StartCheckAvailableProductsFail
  | RemoveUnusableCarts
  | StartCheckAvailableProductsSuccess
  | SetShoppingCart
  | FetchShoppingCart
  | FetchStart
  | FetchSuccess
  | AddOrUpdateCart
  | AddOrUpdateCartFail
  | AddOrUpdateCartSuccess
  | ClearError
  | DeleteCartItem
  | DeleteAllCartItems
  | DeleteAllCartItemsSuccess

//=============================================================================
