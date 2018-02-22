import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductCreatorComponent} from './product-creator/product-creator.component';

const routes = [
  {
    path: '',
    children: [
      { path: 'edit/:id', component: ProductEditorComponent },
      { path: 'add', component: ProductCreatorComponent },
      { path: '', component: ProductsComponent },
    ]
  }
];

export const adminRouterComponents = [
  ProductsComponent,
  ProductEditorComponent,
  ProductCreatorComponent,
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
export class AdminRoutingModule { }
