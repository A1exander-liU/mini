import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() private _authEvent = new EventEmitter<boolean>();
  private _loggedIn = false;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {
    this.isLoggedIn();
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.isLoggedIn());
  }

  async isLoggedIn() {
    try {
      await this.api.me();
      this._loggedIn = true;
    } catch (err) {
      this._loggedIn = false;
    }
    console.log(this._loggedIn ? 'Auth: Logged In' : 'Auth: Not logged in');
    this._authEvent.emit(this._loggedIn);
    return this._loggedIn;
  }

  get authEvent() {
    return this._authEvent;
  }

  get loggedIn() {
    return this._loggedIn;
  }
}
