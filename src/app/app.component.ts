import { Component, OnInit, Inject, Optional } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { ConfigOptionsService } from './shared/config-options.service';
import { ConstantsService } from './shared/constants.service';
import { GeneratorService } from './shared/generator.service';

registerLocaleData(localeUk);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title: string;
  public version: string;
  public user: string;
  public pass: string;
  public date: Observable<Date>;

  constructor(
    private configOptionsService: ConfigOptionsService,
    @Inject(ConstantsService) private constants,
    @Optional() private generatorService: GeneratorService,
  ) {}

  ngOnInit() {
    this.title = this.constants.title;
    this.version = this.constants.version;
    this.user = this.configOptionsService.get('username');
    this.pass = this.generatorService ? this.generatorService.generate() : '12345678';
    this.startClock();
  }

  startClock() {
    this.date = new Observable<Date>((observer: Subscriber<Date>) => {
      observer.next(new Date());                            // set time right away
      setInterval(() => observer.next(new Date()), 1000);   // start ticking
    });
  }


}
