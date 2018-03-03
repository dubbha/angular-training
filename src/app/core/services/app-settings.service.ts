import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, tap, catchError, share } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AppSettingsService {
  appSettings: any;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {}

  init(): Promise<any> {
    const storedSettings = this.localStorageService.getItem('appSettings');
    if (storedSettings) {
      return Promise.resolve(storedSettings).then(data => this.appSettings = data);
    } else {
      return this.http.get('./assets/app-settings.json')
        .toPromise()
        .then(data => {
          this.appSettings = data;
          this.localStorageService.setItem('appSettings', data);
        })
        .catch(err => {
          console.error(err);
          this.setDefaults();
        });
    }
  }

  setDefaults() {
    this.appSettings = {
      title: 'Default Title',
      version: 1,
      cacheTimeToLiveSeconds: 300,
      apiBaseUrl: 'http://127.0.0.1:3000/api',
    };
  }
}
