import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from '../../+store/actions/router.actions';

import { GeneratorService } from './generator.service';
import { SessionStorageService } from '../../core/services';

@Injectable()
export class AuthService {
  constructor(
    private store: Store<AppState>,
    private generatorService: GeneratorService,
    private sessionStorageService: SessionStorageService,
  ) {}

  auth(): boolean {
    return (!!this.sessionStorageService.getItem('token'));
  }

  saveSession(token, username): void {
    console.log('login: ', token, username);
    this.sessionStorageService.setItem('token', token);
    this.sessionStorageService.setItem('username', username);
  }

  login(username, password): void {
    if (username === 'admin' && password === 'password') {
      this.saveSession(this.generatorService.generate(), 'admin');
      this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
    }
  }

  logout(): void {
    this.sessionStorageService.removeItem('token');
    this.sessionStorageService.removeItem('username');
  }

  getUsername(): string {
    return this.sessionStorageService.getItem('username');
  }

  getToken(): string {
    return this.sessionStorageService.getItem('token');
  }
}
