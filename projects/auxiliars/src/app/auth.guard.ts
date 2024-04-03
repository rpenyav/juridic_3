import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';
import { map, take } from 'rxjs/operators';

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/authentication/authentication']);
        return false;
      }
      return true;
    })
  );
};
