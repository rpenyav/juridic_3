import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuridicComponent } from './juridic/juridic.component';
import { RouterModule } from '@angular/router';
import { JURIDIC_ROUTES } from './juridic.routes';
import { SharedLibModule } from 'shared-lib';
import { HeaderComponent, FooterComponent, LayoutComponent } from './layout';

import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpCercadorComponent } from './expedientes/exp-cercador/exp-cercador.component';
import { ClientsComponent } from './clients/clients.component';
import { CliCercadorComponent } from './clients/cli-cercador/cli-cercador.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExpByIdComponent } from './expedientes/exp-by-id/exp-by-id.component';
import { TableComponent } from './shared/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    ReactiveFormsModule,
    RouterModule.forChild(JURIDIC_ROUTES),
  ],
  declarations: [
    JuridicComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ExpedientesComponent,
    ExpCercadorComponent,
    ClientsComponent,
    CliCercadorComponent,
    NotFoundComponent,
    ExpByIdComponent,
    TableComponent,
  ],
  exports: [LayoutComponent],
})
export class JuridicModule {}
