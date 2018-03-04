import { Component, OnInit, Inject, Optional } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { Store } from '@ngrx/store';
import { AppState } from './+store';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { ConstantsService, AppSettingsService } from './core/services';
import { GeneratorService } from './shared/services';
import { AutoUnsubscribe } from './core/decorators';

registerLocaleData(localeUk);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  public pi: number;
  public date: Observable<Date>;
  public appSettings$: Observable<any>;
  private sub: Subscription;

  constructor(
    @Inject(ConstantsService) private constants,
    @Optional() private generatorService: GeneratorService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.pi = this.constants.pi;
    this.appSettings$ = this.store.select('appSettings').pipe(map(i => i.settings));
    this.sub = this.appSettings$.subscribe();
    this.startClock();
  }

  startClock() {
    this.date = new Observable<Date>((observer: Subscriber<Date>) => {
      observer.next(new Date());                            // set time right away
      setInterval(() => observer.next(new Date()), 1000);   // start ticking
    });
  }


}
