import { Action } from '@ngrx/store';
import { Product } from 'src/models/product.model';

export const SET_PRODUCTS = '[Products] Set Products';
export const FETCH_PRODUCTS = '[Products] Fetch Products';
export const FETCH_START = '[Product] Fetch Product Start';
export const FETCH_SUCCESS = '[Product] Fetch Product Success';
export const ADD_PRODUCT = '[Product] Add Product';
export const UPDATE_PRODUCT = '[Product] Update Product';
export const DELETE_PRODUCT = '[Product] Delete Product';
export const START_EDIT = '[Product] Start Edit';
export const STOP_EDIT = '[Product] Stop Edit';
export const MUTATE_FAIL = '[Product] Mutate Product Fail';
export const MUTATE_SUCCESS = '[Product] Mutate Product Success';
export const CLEAR_ERROR = '[Product] Clear Error';
export const START_MUTATE = '[Product] Start Mutate';
export const DELETE_ALL_PRODUCTS = '[Products] Delete All Products'
export const DELETE_ALL_PRODUCTS_SUCCESS = '[Products] Delete All Products Success'

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) {}
}

export class StartMutatingProduct implements Action {
  readonly type = START_MUTATE;

  constructor(public payload: Product) {}
}

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;
}

// Note: not being used right now
export class FetchStart implements Action {
  readonly type = FETCH_START;

  constructor(public payload: number) {}
}

// Note: not being used right now
export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS

  constructor(public payload: Product) {}
}

export class MutateSuccess implements Action {
  readonly type = MUTATE_SUCCESS;

  constructor(public payload: boolean) {}
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) {}
}

export class DeleteAllProduct implements Action {
  readonly type = DELETE_ALL_PRODUCTS;
}

export class DeleteAllProductSuccess implements Action {
  readonly type = DELETE_ALL_PRODUCTS_SUCCESS;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class MutateFail implements Action {
  readonly type = MUTATE_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type ProductActions =
  | AddProduct
  | UpdateProduct
  | DeleteProduct
  | StartEdit
  | StopEdit
  | ClearError
  | MutateFail
  | FetchProducts
  | SetProducts
  | FetchStart
  | FetchSuccess
  | StartMutatingProduct
  | MutateSuccess
  | DeleteAllProduct
  | DeleteAllProductSuccess
