import * as fromProducts from '../reducers/product.reducer'
import * as fromAuthentication from '../reducers/authentication.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  products: fromProducts.State;
  authentication: fromAuthentication.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productReducer,
  authentication: fromAuthentication.authenticationReducer
}
