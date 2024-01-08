import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  loggedIn = false;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {
    this.isLoggedIn();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.isLoggedIn());
  }

  async isLoggedIn() {
    try {
      await this.api.me();
      this.loggedIn = true;
    } catch (err) {
      this.loggedIn = false;
    }
  }
}
