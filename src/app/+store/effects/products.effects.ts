import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ProductsActionTypes } from './../actions';
import * as ProductsActions from './../actions/products.actions';
import * as RouterActions from './../actions/router.actions';

import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/throw';

import { ProductService } from './../../products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  @Effect() getProducts$: Observable<Action> = this.actions$
    .ofType<ProductsActions.GetProducts>(ProductsActionTypes.GET_PRODUCTS)
    .pipe(
    switchMap(action =>
      this.productService.getProducts()
       .then(products => new ProductsActions.GetProductsSuccess(products))
       .catch(err => new ProductsActions.GetProductsError(err))
    )
  );

  @Effect() addProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.AddProduct>(ProductsActionTypes.ADD_PRODUCT)
    .pipe(
      switchMap(action =>
        this.productService.addProduct(action.payload)
          .pipe(
            map(product => new ProductsActions.AddProductSuccess(product)),
            catchError(err => of(new ProductsActions.AddProductError(err))),
          )
      )
    );

  @Effect() addProductSuccess$: Observable<Action> = this.actions$
    .ofType<ProductsActions.AddProductSuccess>(ProductsActionTypes.ADD_PRODUCT_SUCCESS)
    .pipe(
      map(() => new RouterActions.Go({ path: ['/admin'] })),
    );

  @Effect() updateProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.UpdateProduct>(ProductsActionTypes.UPDATE_PRODUCT)
    .pipe(
      switchMap(action =>
        this.productService.updateProduct(action.payload)
          .pipe(
            map(product => new ProductsActions.UpdateProductSuccess(product)),
            catchError(err => of(new ProductsActions.UpdateProductError(err))),
          )
    )
  );

  @Effect() updateProductSuccess$: Observable<Action> = this.actions$
    .ofType<ProductsActions.UpdateProductSuccess>(ProductsActionTypes.UPDATE_PRODUCT_SUCCESS)
    .pipe(
      map(() => new RouterActions.Go({ path: ['/admin'] })),
    );

  @Effect() removeProduct$: Observable<Action> = this.actions$
    .ofType<ProductsActions.RemoveProduct>(ProductsActionTypes.REMOVE_PRODUCT)
    .pipe(
      switchMap(action =>
        this.productService.removeProduct(action.payload)
          .pipe(
            map(product => new ProductsActions.RemoveProductSuccess(action.payload)),
            catchError(err => of(new ProductsActions.RemoveProductError(err))),
          )
    )
  );

  @Effect() removeProductSuccess$: Observable<Action> = this.actions$
    .ofType<ProductsActions.RemoveProductSuccess>(ProductsActionTypes.REMOVE_PRODUCT_SUCCESS)
    .pipe(
      map(() => new RouterActions.Go({ path: ['/admin'] })),
    );
}
