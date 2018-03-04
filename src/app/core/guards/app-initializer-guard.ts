import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, AppSettingsState } from '../../+store';

import { AppSettingsService } from '../services';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class AppInitializerGuard implements CanActivate {

  constructor(
    private appSettingsService: AppSettingsService,
    private store: Store<AppState>,
  ) {}

  canActivate() {
      return this.checkAppInitialized().pipe(
          switchMap(() => of(true)),
          catchError(() => of(false))
      );
  }

  private checkAppInitialized(): Observable<AppSettingsState> {
    return this.store.select('appSettings')
      .pipe(
        tap(appSettings => {
          if (!appSettings.initialized) {
            this.appSettingsService.init();
          }
        }),
        take(1)
      );
  }
}
