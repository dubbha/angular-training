import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap - Observable
  // BehaviorSubject управляет параметрами.
  // Возвращает одно и то же значение каждому подписчику paramMap,
  // пока не будет присвоено новое значение.
  private subject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  // Создаем Observable
  paramMap = this.subject.asObservable();

  // гетер и сетер для testParams
  get testParams() { return this._testParams; }
  set testParams(paramMap: {}) {
    this._testParams = paramMap;
    this.subject.next(paramMap);
  }

  // ActivatedRoute snapshot
  get snapshot() {
    return { paramMap: this.testParams };
  }
}

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
  navigateByUrl(url: string) { return url; }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }
