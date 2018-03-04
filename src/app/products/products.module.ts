import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from '../+store/reducers';
import { ProductsEffects } from '../+store/effects';

import { CartModule } from '../cart/cart.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';

import { ProductService } from './products.service';
import { HighlightDirective } from './highlight.directive';
import { SortProductsPipe } from './product-list/sort-products.pipe';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    HighlightDirective,
    SortProductsPipe,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
    CartModule,
  ],
  exports: [
    ProductListComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductsModule { }
