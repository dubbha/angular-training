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

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product/product.model';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
@AutoUnsubscribe()
export class ProductListComponent implements OnInit {
  sub: Subscription;
  key: string;
  order: string;
  products$: Store<ReadonlyArray<Product>>;
  productsError$: Store<string>;


  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new ProductsActions.GetProducts());

    this.products$ = this.store.select(getSortedProducts);
    this.productsError$ = this.store.select(getProductsError);

    this.sub = new Subscription();
    this.sub.add(this.store.select(getProductsSortKey).subscribe(key => this.key = key));
    this.sub.add(this.store.select(getProductsSortOrder).subscribe(order => this.order = order));
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
}
