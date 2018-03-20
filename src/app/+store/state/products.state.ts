import { HttpErrorResponse } from '@angular/common/http';

import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Product } from '../../products/product/product.model';

export interface ProductsState extends EntityState<Product> {
  readonly loading: boolean;
  readonly error: HttpErrorResponse | Error | string;
  readonly sortKey: string;
  readonly sortOrder: string;
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialProductsState: ProductsState = productsAdapter.getInitialState({
    loading: false,
    error: null,
    sortKey: 'id',
    sortOrder: 'desc',
});
