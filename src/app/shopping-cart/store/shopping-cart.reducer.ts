/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import * as Actions from './shopping-cart.actions';
import { ShoppingCart } from 'src/models/shopping-cart.model';

//=============================================================================

export interface State {
  shoppingCart: ShoppingCart[];
  shoppingCartError: string;
  loading: boolean;
}

const initialState: State = {
  shoppingCart: [],
  shoppingCartError: null,
  loading: false
};

//=============================================================================

export function shoppingCartReducer(state = initialState, action: Actions.ShoppingCartActions) {
  switch (action.type) {

    case Actions.ADD_OR_UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false
      }

      case Actions.ADD_OR_UPDATE_CART_FAIL:
        console.log("Add to cart fail");
        return {
          ...state,
          loading: false,
          shoppingCartError: action.payload
        }

      case Actions.FETCH_SHOPPING_CART:
        return {
          ...state,
          loading: false,
          productError: null
        }

      case Actions.FETCH_SUCCESS:
        return {
          ...state,
          shoppingCart: [...action.payload]
        };

      case Actions.CLEAR_CART:
        return {
          shoppingCart: [],
          shoppingCartError: null,
          loading: false
        }

    default:
      return state;
  }
}

//=============================================================================
