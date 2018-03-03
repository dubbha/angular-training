import { Component, OnInit, Inject, Optional } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { ConstantsService, AppSettingsService } from './core/services';
import { GeneratorService } from './shared/services';

registerLocaleData(localeUk);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public pi: number;
  public date: Observable<Date>;
  public appSettings: any;

  constructor(
    @Inject(ConstantsService) private constants,
    @Optional() private generatorService: GeneratorService,
    public appSettingsService: AppSettingsService,
  ) {}

  ngOnInit() {
    this.pi = this.constants.pi;
    this.appSettings = this.appSettingsService.appSettings;
    this.startClock();
  }

  startClock() {
    this.date = new Observable<Date>((observer: Subscriber<Date>) => {
      observer.next(new Date());                            // set time right away
      setInterval(() => observer.next(new Date()), 1000);   // start ticking
    });
  }


}
