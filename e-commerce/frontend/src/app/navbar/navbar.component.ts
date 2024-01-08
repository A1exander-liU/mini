import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../theme.service';
import { ApiService } from '../api/api.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  mode: 'dark_mode' | 'light_mode' = 'dark_mode';

  constructor(
    public readonly theme: ThemeService,
    private readonly api: ApiService,
    private readonly router: Router
  ) {
    this.mode = theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }

  handleThemeChange() {
    this.theme.toggleTheme();
    this.mode = this.theme.getTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }

  logout() {
    this.api
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch(() => this.router.navigate(['/login']));
  }
}
