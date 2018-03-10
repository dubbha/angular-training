import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, getProductByUrl } from './../../+store';
import * as ProductsActions from './../../+store/actions/products.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product/product.model';
import { CartService } from '../../cart/cart.service';
import { AutoUnsubscribe } from '../../core/decorators';

@Component({
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
@AutoUnsubscribe()
export class ProductCardComponent implements OnInit {
  product: Product;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProductsActions.GetProducts());
    this.sub = this.store.select(getProductByUrl).subscribe(product => this.product = product);
  }

  openProductCard(id) {
    this.store.dispatch(new RouterActions.Go({ path: [`/product/${id}`] }));
  }

  backToProducts() {
    this.store.dispatch(new RouterActions.Go({ path: ['/shop'] }));
  }

  buyProduct() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
    },
    1);
  }
}
