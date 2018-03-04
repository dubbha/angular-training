import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../state/router.state';

import { AppSettingsState } from '../state/app-settings.state';
import { appSettingsReducer } from './app-settings.reducer';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  appSettings: AppSettingsState;
}

export const rootReducers: ActionReducerMap<State> = {
  router: routerReducer,
  appSettings: appSettingsReducer,
};
