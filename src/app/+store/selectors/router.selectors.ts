import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../state';

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
