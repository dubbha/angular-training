import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BillComponent } from './bill/bill.component';
import { CartService } from '../cart/cart.service';

import { CheckoutRoutingModule, checkoutRouterComponents } from './checkout.routing.module';

@NgModule({
  declarations: [checkoutRouterComponents],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule,
  ],
  exports: [],
  providers: [CartService],
})
export class CheckoutModule { }
