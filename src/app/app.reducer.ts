import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from '../reducers/product.reducer';
import * as fromAuthentication from '../reducers/authentication.reducer';
import * as fromShoppingCart from '../reducers/shopping-cart.reducer';

export interface AppState {
  products: fromProducts.State;
  authentication: fromAuthentication.State;
  shoppingCart: fromShoppingCart.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productReducer,
  authentication: fromAuthentication.authenticationReducer,
  shoppingCart: fromShoppingCart.shoppingCartReducer
}
