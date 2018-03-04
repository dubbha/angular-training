import { Component, OnInit } from '@angular/core';

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
  username = 'admin';
  password = 'admin';

  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
  ) {}

  ngOnInit() {}

  onSubmit(event) {
    this.authService.login(this.username, this.password);
    event.preventDefault();
  }

  openAdminZone() {
    this.store.dispatch(new RouterActions.Go({ path: ['/admin'] }));
  }

  logout() {
    this.authService.logout();
    this.store.dispatch(new RouterActions.Go({ path: ['/'] }));
  }
}
