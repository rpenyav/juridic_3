import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'projects/authentication/src/app/authentication.service';
import { map, take } from 'rxjs/operators';

// Define la función que actúa como guardia de autenticación
export const canActivate: CanActivateFn = () => {
  // Utiliza inject para obtener las instancias de los servicios necesarios.
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  // Utiliza el servicio authService para comprobar si el usuario está autenticado.
  return authService.isLoggedIn().pipe(
    take(1),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        // Si el usuario no está autenticado, redirige a la página de login.
        router.navigate(['/authentication/authentication']);
        // Devuelve false para cancelar la navegación actual.
        return false;
      }
      // Si el usuario está autenticado, permite la navegación.
      return true;
    })
  );
};
