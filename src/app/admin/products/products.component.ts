import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  AppState,
  getProductsError,
  getSortedProducts,
  getProductsSortKey,
  getProductsSortOrder
} from './../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../products/product/product.model';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
@AutoUnsubscribe()
export class ProductsComponent implements OnInit {
  key: string;
  order: string;
  products$: Store<ReadonlyArray<Product>>;
  productsError$: Store<string>;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(getSortedProducts);
    this.productsError$ = this.store.select(getProductsError);

    this.sub = new Subscription();
    this.sub.add(this.store.select(getProductsSortKey).subscribe(key => this.key = key));
    this.sub.add(this.store.select(getProductsSortOrder).subscribe(order => this.order = order));

    this.store.dispatch(new ProductsActions.GetProducts());
  }

  sortProducts(key) {
    let order;
    if (this.key === key) {
      order = this.order === 'asc' ? 'desc' : 'asc';    // toggle order
    } else {
      order = 'desc';    // reset order
    }

    this.store.dispatch(new ProductsActions.SetSortKey(key));
    this.store.dispatch(new ProductsActions.SetSortOrder(order));
  }

  openAddProduct() {
    this.store.dispatch(new RouterActions.Go({ path: ['/admin/add'] }));
  }

}
