import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';

const routes = [
  {
    path: '',
    children: [
      { path: 'edit/:id', component: ProductEditorComponent },
      { path: '', component: ProductsComponent },
    ]
  }
];

export const adminRouterComponents = [ProductsComponent];

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
export class AdminRoutingModule { }
