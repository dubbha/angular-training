import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Product } from '../../products/product/product.model';

export interface ProductsState extends EntityState<Product> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialProductsState: ProductsState = productsAdapter.getInitialState({
    loading: false,
    loaded: false,
    error: null,
});
