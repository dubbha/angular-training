import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../shared/services';
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
    private messageService: MessageService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.details = new Details(null, null, null);
  }

  checkout() {
    this.cartService.clear();

    this.messageService.set(
      'order processed successfully',
      'success',
      () => {
        this.router.navigate(['/']);
      }
    );
    this.router.navigate([{ outlets: { message: ['display'] } }]);
  }

}
