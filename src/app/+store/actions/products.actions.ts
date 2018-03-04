import { Action } from '@ngrx/store';

import { Product } from './../../products/product/product.model';

export class ProductsActionTypes {
  static readonly GET_PRODUCTS = '[Products] GET_PRODUCTS';
  static readonly GET_PRODUCT = '[Products] GET_PRODUCT';
}

export class GetProducts implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS;
}

export class GetProduct implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCT;
  constructor(public payload: string | number) { }
}

export type ProductsActions
  = GetProducts
  | GetProduct;

