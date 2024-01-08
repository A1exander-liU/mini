import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly api: ApiService) {}

  async isLoggedIn() {
    try {
      await this.api.me();
      return true;
    } catch (err) {
      return false;
    }
  }
}
