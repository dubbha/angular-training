import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ProductsActionTypes } from './../actions';
import * as ProductsActions from './../actions/products.actions';

import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { ProductService } from './../../products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  @Effect() getProducts$: Observable<void> = this.actions$
    .ofType<ProductsActions.GetProducts>(ProductsActionTypes.GET_PRODUCTS)
    .pipe(
    switchMap(action =>
      this.productService.getProducts()
       .then(products => console.log(products))
       .catch(err => console.error(err))
        // .then(tasks => new TasksActions.GetTasksSuccess(tasks) )
        // .catch(err => new TasksActions.GetTasksError(err))
    )
  );
}
