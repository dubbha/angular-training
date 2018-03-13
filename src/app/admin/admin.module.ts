import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './product/product.component';
import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    adminRouterComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule { }
