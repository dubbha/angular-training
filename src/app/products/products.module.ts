import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartModule } from '../cart/cart.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';

import { ProductService } from './products.service';
import { HighlightDirective } from './highlight.directive';
import { SortProductsPipe } from './product-list/sort-products.pipe';

@NgModule({
  imports: [
    CommonModule,
    CartModule,
  ],
  declarations: [
    ProductComponent,
    ProductListComponent,
    HighlightDirective,
    SortProductsPipe,
    ProductCardComponent,
  ],
  exports: [
    ProductListComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductsModule { }
