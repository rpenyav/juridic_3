import { Routes } from '@angular/router';
import { canActivate } from './auth.guard';
import { JuridicComponent } from './juridic/juridic/juridic.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: JuridicComponent,
    // canActivate: [canActivate],
  },
  //   {
  //     path: 'clientes',
  //     component: ClientesComponent,
  //     canActivate: [AuthGuard]  // Asegurar cada ruta si es necesario
  //   },
];
