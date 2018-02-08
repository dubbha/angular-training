import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { WindowRefService } from './shared/window-ref.service';
import { LocalStorageService } from './shared/local-storage.service';
import { ConfigOptionsService } from './shared/config-options.service';
import { constants, ConstantsService } from './shared/constants.service';
import { GeneratorService } from './shared/generator.service';

const config = new ConfigOptionsService({
  id: 123456,
  username: 'admin',
  email: 'admin@angular.io'
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ProductsModule,
    CartModule,
  ],
  providers: [
    WindowRefService,
    LocalStorageService,
    { provide: ConfigOptionsService, useValue: config },
    { provide: ConstantsService, useValue: constants },
    { provide: GeneratorService, useFactory: () => new GeneratorService(8) },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
