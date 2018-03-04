import { Action } from '@ngrx/store';

export class AppSettingsActionTypes {
  static readonly INIT = '[AppSettings] INIT';
}

export class Init implements Action {
  readonly type = AppSettingsActionTypes.INIT;
  constructor(public payload: any) {}
}

export type AppSettingsActions
  = Init;
