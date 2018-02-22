import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    public router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit() {}

  onSubmit(event) {
    this.authService.login(this.username, this.password);
    event.preventDefault();
  }

  openAdminZone() {
    this.router.navigate(['/admin']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
