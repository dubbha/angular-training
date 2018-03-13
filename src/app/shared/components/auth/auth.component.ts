import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../../+store';
import * as RouterActions from '../../../+store/actions/router.actions';

import { AuthService } from '../../services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  username = new FormControl('admin', Validators.required);
  password = new FormControl('password', Validators.required);

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  onSubmit() {
    this.authService.login(this.username.value, this.password.value);
  }

  openAdminZone() {
    this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new RouterActions.Go({ path: ['/'] }));
  }
}
