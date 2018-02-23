import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, tap, catchError, share } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AppSettingsService implements OnDestroy {
  sub: Subscription;
  appSettings: Observable<any>;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
    const storedSettings = this.localStorageService.getItem('appSettings');
    if (storedSettings) {
      this.appSettings = Observable.of(storedSettings);
    } else {
      this.appSettings = this.http.get('./assets/app-settings.json')
        .pipe(
          tap(data => console.log(data)),
          catchError(this.handleError),
          share()   // prevent a separate http request for each async pipe, a "warm" Observable:
                    // https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html#caveat-http-with-observables
        );
      this.sub = this.appSettings.subscribe(data => {
        this.localStorageService.setItem('appSettings', data);
      });
    }
  }

  handleError(err: any): Observable<any> {
    return Observable.throw(err);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
