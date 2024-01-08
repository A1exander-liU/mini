import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from '../api/api.service';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const api = inject(ApiService);
  try {
    await api.me();
    return true;
  } catch (err) {
    return false;
  }
};
