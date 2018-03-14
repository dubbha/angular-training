import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class StoreStub {
  private subject = new BehaviorSubject(this.testParams);
  private _state: {};

  state = this.subject.asObservable();

  constructor(initialState) {
    this._state = initialState;
    this.subject.next(initialState);
  }

  get testParams() { return this._state; }
  set testParams(state: {}) {
    this._state = state;
    this.subject.next(state);
  }

  select() {
    // console.log('select called, returning', this._state);
    return this._state;
  }
}
