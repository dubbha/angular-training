import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../cart/cart.service';

@Component({
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.sass']
})
export class BillComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  nextStep() {
    this.router.navigate(['/checkout/address']);
  }
}
