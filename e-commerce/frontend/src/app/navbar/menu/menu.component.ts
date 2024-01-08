import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { ApiService } from '../../api/api.service';
import { NavigationStart, Router } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { LoginLogoutMenuComponent } from './login-logout-menu/login-logout-menu.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProfileMenuComponent, LoginLogoutMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  mode: 'dark_mode' | 'light_mode' = 'dark_mode';
  loggedIn = false;

  constructor(
    public readonly theme: ThemeService,
    private readonly api: ApiService,
    private readonly router: Router
  ) {
    this.isLoggedIn();
    this.mode = theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => this.isLoggedIn(event));
  }

  handleThemeChange() {
    this.theme.toggleTheme();
    this.mode = this.theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }

  isLoggedIn(event?: any) {
    if (event) {
      console.log(event);
    }
    this.api
      .me()
      .then(() => {
        this.loggedIn = true;
      })
      .catch(() => {
        this.loggedIn = false;
      });
  }
}
