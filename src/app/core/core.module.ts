import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';

import {
  WindowRefService,
  LocalStorageService,
  ConfigOptionsService,
  constants,
  ConstantsService,
} from './services';

const config = new ConfigOptionsService({
  id: 123456,
  username: 'admin',
  email: 'admin@angular.io'
});

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    WindowRefService,
    LocalStorageService,
    { provide: ConfigOptionsService, useValue: config },
    { provide: ConstantsService, useValue: constants },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
