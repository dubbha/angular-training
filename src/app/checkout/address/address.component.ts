import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
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
      callback: () => this.router.navigate(['/']),
    });
  }

}
