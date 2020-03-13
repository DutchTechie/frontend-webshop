import { Product } from 'src/models/product.model';
import * as Actions from './product.actions';

export interface State {
  products: Array<Product>;
  currentProduct: Product;
  editedProductIndex: number;
  productError: string;
  loading: boolean;
  redirect: boolean;
}

const initialState: State = {
  products: [],
  currentProduct: null,
  editedProductIndex: -1,
  productError: null,
  loading: false,
  redirect: false
};

export function productReducer(state = initialState, action: Actions.ProductActions) {
  switch (action.type) {
    case Actions.FETCH_SUCCESS:
      const currentProduct = action.payload;

      return {
        ...state,
        productError: null,
        currentProduct: currentProduct
      };

    case Actions.FETCH_START:
      return {
        ...state,
        loading: false,
        productError: null
      }

    case Actions.SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload]
      };

    case Actions.DELETE_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: []
      }

    case Actions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        productError: null
      };
    case Actions.START_EDIT:
      return {
        ...state,
        editedProductIndex: action.payload,
        editedProduct: {...state.products[action.payload]},
        loading: false,
        productError: null
      };
    case Actions.STOP_EDIT:
      return {
        ...state,
        editedProduct: null,
        editedProductIndex: -1,
        loading: false,
        productError: null
      };
    case Actions.UPDATE_PRODUCT:
      const productToUpdate = state.products[action.payload.id];
      const updatedProduct = {
        ...productToUpdate,
        ...action.payload
      }
      const updatedProducts = [...state.products];
      updatedProducts[action.payload.id] = updatedProduct;
      return {
        ...state,
        products: updatedProducts,
        productError: null
      };
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => {
          return +product.id !== action.payload;
        }),
        productError: null
      };

    case Actions.MUTATE_FAIL:
      return {
        ...state,
        loading: false,
        productError: action.payload
      }

    case Actions.MUTATE_SUCCESS:
      return {
        ...state,
        loading: false,
        redirect: true
      }

    default:
      return state;
  }
}
