import { Routes } from '@angular/router';
import { canActivate } from './auth.guard';
import { JuridicComponent } from './juridic/juridic/juridic.component';
import { ExpedientsComponent } from './juridic/expedients/expedients.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ExpedientsComponent,
    // canActivate: [canActivate],
  },
  //   {
  //     path: 'clientes',
  //     component: ClientesComponent,
  //     canActivate: [AuthGuard]  // Asegurar cada ruta si es necesario
  //   },
];
