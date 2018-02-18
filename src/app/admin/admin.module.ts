import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductComponent } from './product/product.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductEditorComponent,
    adminRouterComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule { }
