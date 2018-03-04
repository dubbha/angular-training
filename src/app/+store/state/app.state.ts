import { ActionReducerMap } from '@ngrx/store';

import { AppSettingsState } from './app-settings.state';
import { appSettingsReducer } from '../reducers';

import { ProductsState } from './products.state';
import { productsReducer } from './../reducers';

export interface AppState {
  appSettings: AppSettingsState;
  products: ProductsState;
}

export const reducers: ActionReducerMap<AppState> = {
  appSettings: appSettingsReducer,
  products: productsReducer,
};
