import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from './cart.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CartListComponent,
    CartItemComponent,
  ],
  exports: [
    CartListComponent,
  ],
  providers: [
    CartService,
  ],
})
export class CartModule { }
