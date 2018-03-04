import { ProductsActionTypes, ProductsActions } from '../actions';
import { productsAdapter, ProductsState, initialProductsState } from './../state/products.state';
import { Product } from './../../products/product/product.model';

export function productsReducer(
  state = initialProductsState,
  action: ProductsActions
): ProductsState {

  switch (action.type) {
    case ProductsActionTypes.GET_PRODUCTS:
    case ProductsActionTypes.ADD_PRODUCT:
    case ProductsActionTypes.REMOVE_PRODUCT:
    case ProductsActionTypes.UPDATE_PRODUCT: {
      return {
        ...state,
        loading: true
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_ERROR:
    case ProductsActionTypes.ADD_PRODUCT_ERROR:
    case ProductsActionTypes.REMOVE_PRODUCT_ERROR:
    case ProductsActionTypes.UPDATE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        error
      };
    }

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS: {
      const products = [...<Array<Product>>action.payload];

      return productsAdapter.addAll(products, { ...state, loading: false });
    }

    case ProductsActionTypes.ADD_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };

      return productsAdapter.addOne(product, { ...state, loading: false });
    }

    case ProductsActionTypes.REMOVE_PRODUCT_SUCCESS: {
      const id = <number>action.payload;

      return productsAdapter.removeOne(id, { ...state, loading: false });
    }

    case ProductsActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };

      return productsAdapter.updateOne({ id: product.id, changes: product }, { ...state, loading: false });
    }


    case ProductsActionTypes.SET_SORT_KEY: {
      return { ...state, sortKey: <string>action.payload };
    }

    case ProductsActionTypes.SET_SORT_ORDER: {
      return { ...state, sortOrder: <string>action.payload };
    }

    default: {
      return state;
    }
  }
}
