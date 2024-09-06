import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorRes } from '../api/types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private api: ApiService,
  ) {}

  emailError = '';
  usernameError = '';
  passwordError = '';
  serverError: string | string[] = '';

  showErrorMessages() {
    this.serverError = '';
    this.emailError = '';
    this.usernameError = '';
    this.passwordError = '';

    const emailErrors = this.registerForm.get('email')?.errors;
    const usernameErrors = this.registerForm.get('username')?.errors;
    const passwordErrors = this.registerForm.get('password')?.errors;

    console.log(emailErrors);

    if (emailErrors && emailErrors['required']) {
      this.emailError = 'This field is required';
    } else if (emailErrors && emailErrors['email']) {
      this.emailError = 'Invalid email format';
    }

    if (usernameErrors && usernameErrors['required']) {
      this.usernameError = 'This field is required';
    }

    if (passwordErrors && passwordErrors['required']) {
      this.passwordError = 'This field is required';
    }
  }

  handleRegister() {
    this.showErrorMessages();

    console.log(this.registerForm.status);

    if (this.registerForm.status === 'VALID') {
      try {
        this.api
          .register({
            email: this.registerForm.value.email!,
            username: this.registerForm.value.username!,
            password: this.registerForm.value.password!,
          })
          .then(() => this.router.navigate(['/']));
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          this.serverError = (err.error as ErrorRes).message;
        }
      }
    }
  }
}
