import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { RouterLink } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { LoginLogoutMenuComponent } from './login-logout-menu/login-logout-menu.component';
import { AuthService } from '../../services/auth.service';
import { CartMenuComponent } from './cart-menu/cart-menu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    ProfileMenuComponent,
    LoginLogoutMenuComponent,
    CartMenuComponent,
    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  mode: 'dark_mode' | 'light_mode' = 'dark_mode';
  loggedIn = false;

  constructor(
    public readonly theme: ThemeService,
    private readonly auth: AuthService
  ) {
    auth.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.mode = theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }
  ngOnInit(): void {
    this.auth.authEvent.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  handleThemeChange() {
    this.theme.toggleTheme();
    this.mode = this.theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }
}
