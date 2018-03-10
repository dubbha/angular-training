import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { AppSettingsState } from '../../+store';
import * as AppSettingsActions from '../../+store/actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, tap, catchError, share } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AppSettingsService {

  constructor(
    private store: Store<AppSettingsState>,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {}

  init(): Promise<any> {
    console.log('APP_INITIALIZER');
    const storedSettings = this.localStorageService.getItem('appSettings');
    if (storedSettings) {
      return Promise.resolve(storedSettings)
        .then(data => this.store.dispatch(new AppSettingsActions.Init(data)));
    } else {
      return this.http.get('./assets/app-settings.json')
        .toPromise()
        .then(data => {
          this.store.dispatch(new AppSettingsActions.Init(data));
          this.localStorageService.setItem('appSettings', data);
        })
        .catch(err => {
          console.error(err);
          this.setDefaults();
        });
    }
  }

  setDefaults() {
    this.store.dispatch(new AppSettingsActions.Init({
      title: 'Default Title',
      version: 1,
      cacheTimeToLiveSeconds: 300,
      apiBaseUrl: 'http://127.0.0.1:3000/api',
    }));
  }
}
