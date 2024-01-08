import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  usernameError = '';
  passwordError = '';

  constructor(private router: Router, private readonly api: ApiService) {}

  showDetails() {
    console.log(this.loginForm.value);
  }

  showErrorMessages() {
    this.usernameError = '';
    this.passwordError = '';

    const usernameErrors = this.loginForm.get('username')?.errors;
    const passwordErrors = this.loginForm.get('password')?.errors;

    if (usernameErrors && usernameErrors['required']) {
      this.usernameError = 'This field is required';
    }

    if (passwordErrors && passwordErrors['required']) {
      this.passwordError = 'This field is required';
    }
  }

  handleLogin() {
    this.showErrorMessages();

    if (this.loginForm.status === 'VALID') {
      this.api.login({
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      });
      this.router.navigate(['/']);
    }
  }
}
