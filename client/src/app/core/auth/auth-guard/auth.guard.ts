import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../../services/jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/auth/login');
};
