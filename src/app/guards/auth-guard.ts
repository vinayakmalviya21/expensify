import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);

  const router = inject(Router);

  // ✅ CHECK TOKEN
  if (authService.isLoggedIn()) {

    return true;

  }

  // ❌ NOT LOGGED IN
  router.navigate(['/']);

  return false;

};