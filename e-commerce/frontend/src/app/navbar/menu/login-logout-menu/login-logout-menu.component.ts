import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-login-logout-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-logout-menu.component.html',
  styleUrl: './login-logout-menu.component.css',
})
export class LoginLogoutMenuComponent {
  @Input() loggedIn = false;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

  handleLogout() {
    this.api.logout().finally(() => {
      this.router.navigate(['/home']);
    });
  }
}
