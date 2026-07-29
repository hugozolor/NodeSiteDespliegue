import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacionAdminService } from '../servicios/autenticacion-admin';
import { map, take } from 'rxjs/operators';

export const adminGuardia: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionAdminService);
  const router = inject(Router);

  return authService.adminActual.pipe(
    take(1), // Tomamos el valor actual y cerramos la suscripción
    map(admin => {
      if (admin) {
        // Si hay un admin en el servicio, lo dejamos pasar
        return true;
      } else {
        // Si no hay nadie, lo mandamos al login de admin
        router.navigate(['/admin/login']);
        return false;
      }
    })
  );
};