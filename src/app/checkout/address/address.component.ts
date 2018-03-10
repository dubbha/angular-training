import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from './../../+store/actions/router.actions';

import { ModalService } from '../../shared/services';
import { CartService } from '../../cart/cart.service';
import { Details } from './details.model';

@Component({
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {
  details: Details;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.details = new Details(null, null, null);
  }

  checkout() {
    this.cartService.clear();
    this.modalService.alert('order processed successfully', {
      style: 'success',
      callback: () => this.store.dispatch(new RouterActions.Go({ path: ['/'] })),
    });
  }

}
