import { ProductsActionTypes, ProductsActions } from '../actions';
import { productsAdapter, ProductsState, initialProductsState } from './../state/products.state';
import { Product } from './../../products/product/product.model';

export function productsReducer(
  state = initialProductsState,
  action: ProductsActions
): ProductsState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {

    case ProductsActionTypes.GET_PRODUCTS:
    case ProductsActionTypes.GET_PRODUCT: {
      return {
        ...state,
        loading: true
      };
    }

    default: {
      return state;
    }
  }
}
