import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate guard is called');
    const auth = this.authService.auth();
    if (!auth) {
      this.router.navigate(['/shop']);
    }
    return auth;
  }

  canLoad(route: Route): boolean {
    console.log('canLoad guard is activated');
    const auth = this.authService.auth();
    if (!auth) {
      this.router.navigate(['/shop']);
    }
    return auth;
  }
}
