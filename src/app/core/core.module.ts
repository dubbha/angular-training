import { NgModule, Optional, SkipSelf, APP_INITIALIZER,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { TimingInterceptor } from './interceptors/http-interceptor';

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
    {
      provide: APP_INITIALIZER,
      useFactory: (settings: AppSettingsService) => () => settings.init(),
      deps: [AppSettingsService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true,
    }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
