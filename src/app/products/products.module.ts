import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product/product.service';
import { HighlightDirective } from './product/highlight.directive';
import { SortProductsPipe } from './product-list/sort-products.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    HighlightDirective,
    SortProductsPipe,
  ],
  exports: [
    ProductListComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductsModule { }
