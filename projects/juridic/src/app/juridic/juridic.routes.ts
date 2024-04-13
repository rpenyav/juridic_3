import { Routes } from '@angular/router';
import { JuridicComponent } from './juridic/juridic.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpCercadorComponent } from './expedientes/exp-cercador/exp-cercador.component';
import { ClientsComponent } from './clients/clients.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExpByIdComponent } from './expedientes/exp-by-id/exp-by-id.component';

export const JURIDIC_ROUTES: Routes = [
  { path: '', redirectTo: '/juridic', pathMatch: 'full' },
  { path: 'juridic', component: JuridicComponent },

  { path: 'expedientes', redirectTo: '/not-found', pathMatch: 'full' },
  { path: 'expedientes/buscador', component: ExpedientesComponent },
  { path: 'expedientes/:tabId', component: ExpedientesComponent },

  { path: 'clientes', redirectTo: '/not-found', pathMatch: 'full' },
  { path: 'clientes/buscador', component: ClientsComponent },
  { path: 'clientes/:tabId', component: ClientsComponent },
  { path: 'not-found', component: NotFoundComponent },

  { path: '**', redirectTo: '/not-found' },
];
