import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductsService } from './services/products.service';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProductsService,
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
