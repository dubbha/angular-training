import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { rootReducers, RouterStateSerializerProvider, RouterEffects } from '../+store';
import { appSettingsReducer } from '../+store/reducers/index';

import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { TimingInterceptor } from './interceptors/http-interceptor';
import { AppInitializerGuard } from './guards/app-initializer-guard';
import { environment } from '../../environments/environment';

import {
  WindowRefService,
  LocalStorageService,
  SessionStorageService,
  constants,
  ConstantsService,
  AppSettingsService,
} from './services';
import { reducers } from '../+store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RouterEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
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
    },
    AppInitializerGuard,
    RouterStateSerializerProvider,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
