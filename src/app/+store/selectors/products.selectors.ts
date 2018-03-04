import { HttpErrorResponse } from '@angular/common/http';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsAdapter, ProductsState } from './../state';
import { getRouterState } from '../selectors/router.selectors';

import { SortProductsPipe } from '../../products/product-list/sort-products.pipe';

export const getProductsState = createFeatureSelector<ProductsState>('products');

import { Product } from './../../products/product/product.model';

export const {
  selectEntities: getProductsEntities,
  selectAll: getProductsData,
} = productsAdapter.getSelectors(getProductsState);

export const getProductsError = createSelector(getProductsState, (state: ProductsState) => {
  const error = state.error;
  if (error instanceof HttpErrorResponse || error instanceof Error) {
    return error.message;
  }
  return error;
});

export const getProductsSortKey = createSelector(getProductsState, (state: ProductsState) => state.sortKey);
export const getProductsSortOrder = createSelector(getProductsState, (state: ProductsState) => state.sortOrder);

export const getSortedProducts = createSelector(
  getProductsData,
  getProductsSortKey,
  getProductsSortOrder,
  (products: Product[], sortKey: string, sortOrder: string) =>
    new SortProductsPipe().transform(products, sortKey, sortOrder),
);

export const getProductByUrl = createSelector(
  getProductsData,
  getRouterState,
  (products, router): Product => {
    const id = router.state.params.id;
    if (id) {
      return products.find(p => p.id === +id);
    }
  }
);
