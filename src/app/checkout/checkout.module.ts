import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckoutComponent],
  exports: [CheckoutComponent],
})
export class CheckoutModule { }
