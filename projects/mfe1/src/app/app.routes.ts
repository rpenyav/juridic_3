import { Routes } from '@angular/router';
import { canActivate } from './auth.guard';

import { FlightsSearchComponent } from './flights/flights-search/flights-search.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: FlightsSearchComponent,
    // canActivate: [canActivate],
  },
  //   {
  //     path: 'clientes',
  //     component: ClientesComponent,
  //     canActivate: [AuthGuard]  // Asegurar cada ruta si es necesario
  //   },
];
