import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ProductsModule,
    CartModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
