import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  @Output() private _authEvent = new EventEmitter<boolean>();
  private _loggedIn = false;

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
      this._loggedIn = true;
    } catch (err) {
      this._loggedIn = false;
    }
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
