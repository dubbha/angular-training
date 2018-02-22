import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillComponent } from './bill/bill.component';
import { AddressComponent } from './address/address.component';

const routes = [
  {
    path: '',
    children: [
      { path: 'address', component: AddressComponent },
      { path: '', component: BillComponent },
    ]
  }
];

export const checkoutRouterComponents = [
  BillComponent,
  AddressComponent,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class CheckoutRoutingModule { }
