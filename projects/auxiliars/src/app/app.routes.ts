import { Routes } from '@angular/router';
import { canActivate } from './auth.guard';
import { AuxiliarsComponent } from './auxiliars/auxiliars/auxiliars.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: AuxiliarsComponent,
    // canActivate: [canActivate],
  },
  //   {
  //     path: 'clientes',
  //     component: ClientesComponent,
  //     canActivate: [AuthGuard]  // Asegurar cada ruta si es necesario
  //   },
];
