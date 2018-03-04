import { Action } from '@ngrx/store';

import { Product } from './../../products/product/product.model';

export class ProductsActionTypes {
  static readonly GET_PRODUCTS = '[Products] GET_PRODUCTS';
  static readonly GET_PRODUCTS_SUCCESS = '[Products] GET_PRODUCTS_SUCCESS';
  static readonly GET_PRODUCTS_ERROR = '[Products] GET_PRODUCTS_ERROR';
  static readonly ADD_PRODUCT = '[Products] ADD_PRODUCT';
  static readonly ADD_PRODUCT_SUCCESS = '[Products] ADD_PRODUCT_SUCCESS';
  static readonly ADD_PRODUCT_ERROR = '[Products] ADD_PRODUCT_ERROR';
  static readonly REMOVE_PRODUCT = '[Products] REMOVE_PRODUCT';
  static readonly REMOVE_PRODUCT_SUCCESS = '[Products] REMOVE_PRODUCT_SUCCESS';
  static readonly REMOVE_PRODUCT_ERROR = '[Products] REMOVE_PRODUCT_ERROR';
  static readonly UPDATE_PRODUCT = '[Products] UPDATE_PRODUCT';
  static readonly UPDATE_PRODUCT_SUCCESS = '[Products] UPDATE_PRODUCT_SUCCESS';
  static readonly UPDATE_PRODUCT_ERROR = '[Products] UPDATE_PRODUCT_ERROR';
  static readonly SET_SORT_KEY = '[Products] SET_SORT_KEY';
  static readonly SET_SORT_ORDER = '[Products] SET_SORT_ORDER';
}

export class GetProducts implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetProductsError implements Action {
  readonly type = ProductsActionTypes.GET_PRODUCTS_ERROR;
  constructor(public payload: Error | string) {}
}

export class AddProduct implements Action {
  readonly type = ProductsActionTypes.ADD_PRODUCT;
  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  readonly type = ProductsActionTypes.ADD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class AddProductError implements Action {
  readonly type = ProductsActionTypes.ADD_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class RemoveProduct implements Action {
  readonly type = ProductsActionTypes.REMOVE_PRODUCT;
  constructor(public payload: number) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = ProductsActionTypes.REMOVE_PRODUCT_SUCCESS;
  constructor(public payload: number) {}
}

export class RemoveProductError implements Action {
  readonly type = ProductsActionTypes.REMOVE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class UpdateProductError implements Action {
  readonly type = ProductsActionTypes.UPDATE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class SetSortKey implements Action {
  readonly type = ProductsActionTypes.SET_SORT_KEY;
  constructor(public payload: string) { }
}

export class SetSortOrder implements Action {
  readonly type = ProductsActionTypes.SET_SORT_ORDER;
  constructor(public payload: string) { }
}

export type ProductsActions
  = GetProducts
  | GetProductsSuccess
  | GetProductsError
  | AddProduct
  | AddProductSuccess
  | AddProductError
  | RemoveProduct
  | RemoveProductSuccess
  | RemoveProductError
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductError
  | SetSortKey
  | SetSortOrder;
