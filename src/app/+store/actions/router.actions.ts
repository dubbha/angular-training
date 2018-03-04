import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export class RouterActionTypes {
  static readonly GO      = '[Router] GO';
  static readonly BACK    = '[Router] BACK';
  static readonly FORWARD = '[Router] FORWARD';
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;
  constructor(
    public payload: {
      path: any[],
      queryParams?: object,
      extras?: NavigationExtras
  }) { }
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterActions
 = Go
 | Back
 | Forward;
