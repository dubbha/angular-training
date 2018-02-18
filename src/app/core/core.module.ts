import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';

import {
  WindowRefService,
  LocalStorageService,
  SessionStorageService,
  ConfigOptionsService,
  constants,
  ConstantsService,
} from './services';

const config = (new ConfigOptionsService()).init({
  id: 123456,
  username: 'admin',
  email: 'admin@angular.io'
});

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WindowRefService,
    LocalStorageService,
    SessionStorageService,
    { provide: ConfigOptionsService, useValue: config },
    { provide: ConstantsService, useValue: constants },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
