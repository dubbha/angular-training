import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BillComponent } from './bill/bill.component';
import { CartService } from '../cart/cart.service';

import { CheckoutRoutingModule, checkoutRouterComponents } from './checkout.routing.module';

@NgModule({
  declarations: [checkoutRouterComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class CheckoutModule { }
