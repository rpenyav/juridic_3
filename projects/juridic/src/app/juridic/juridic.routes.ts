import { Routes } from '@angular/router';
import { JuridicComponent } from './juridic/juridic.component';
import { ExpedientsComponent } from './expedients/expedients.component';

export const JURIDIC_ROUTES: Routes = [
  {
    path: 'juridic',
    component: JuridicComponent,
  },
  {
    path: 'expedients',
    component: ExpedientsComponent,
  },
];
