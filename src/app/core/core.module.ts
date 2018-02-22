import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';

import {
  WindowRefService,
  LocalStorageService,
  SessionStorageService,
  constants,
  ConstantsService,
  AppSettingsService,
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    WindowRefService,
    LocalStorageService,
    SessionStorageService,
    { provide: ConstantsService, useValue: constants },
    AppSettingsService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
