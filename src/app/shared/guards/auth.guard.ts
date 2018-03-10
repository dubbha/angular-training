import { Injectable } from '@angular/core';
import { Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from '../../+store/actions/router.actions';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate guard is called');
    const auth = this.authService.auth();
    if (!auth) {
      this.store.dispatch(new RouterActions.Go({ path: ['/shop'] }));
    }
    return auth;
  }

  canLoad(route: Route): boolean {
    console.log('canLoad guard is activated');
    const auth = this.authService.auth();
    if (!auth) {
      this.store.dispatch(new RouterActions.Go({ path: ['/shop'] }));
    }
    return auth;
  }
}
