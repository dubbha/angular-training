import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AppSettingsService {
  public appSettings: Observable<any>;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
    const storedSettings = this.localStorageService.getItem('appSettings');

    if (storedSettings) {
      this.appSettings =  Observable.of(storedSettings);
    } else {
      this.appSettings = this.http.get('./assets/app-settings.json');
      this.appSettings.subscribe(data => {
        this.localStorageService.setItem('appSettings', data);
      });
    }
  }

  // getAppSettingsJson(): Observable<any> {
  //   return this.http.get('./assets/app-settings.json');
  // }

  // getSettings(): Observable<any> {
  //   if (this.storedSettings) {
  //     return this.storedSettings;
  //   } else {
  //     this.getAppSettingsJson().subscribe(data => {
  //       this.localStorageService.setItem('appSettings', data);
  //       return data;
  //     });
  //   }
  // }

}
