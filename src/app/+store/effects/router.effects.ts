import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import { RouterActionTypes } from './../actions';
import * as RouterActions from './../actions/router.actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {

  @Effect({ dispatch: false }) navigate$ = this.actions$
    .ofType<RouterActions.Go>(RouterActionTypes.GO)
    .pipe(
      map((action: RouterActions.Go) => action.payload),
      tap(({path, queryParams, extras}) => {
          this.router.navigate(path, {queryParams, ...extras});
      })
    );

  @Effect({ dispatch: false }) navigateBack$ = this.actions$
    .ofType<RouterActions.Back>(RouterActionTypes.BACK)
    .pipe(
        tap(() => this.location.back())
    );

  @Effect({ dispatch: false }) navigateForward$ = this.actions$
    .ofType<RouterActions.Forward>(RouterActionTypes.FORWARD)
    .pipe(
        tap(() => this.location.forward())
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
