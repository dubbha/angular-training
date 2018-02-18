import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GeneratorService } from './generator.service';
import { SessionStorageService } from '../../core/services';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
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
    if (username === 'admin' && password === 'admin') {
      this.saveSession(this.generatorService.generate(), 'admin');
      this.router.navigate(['/admin']);
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
