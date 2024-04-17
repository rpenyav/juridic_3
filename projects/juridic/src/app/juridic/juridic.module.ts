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
import { TableComponent } from './shared/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './shared/detail/detail.component';
import { SubTabsComponent } from './shared/sub-tabs/sub-tabs.component';

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
    TableComponent,
    DetailComponent,
    SubTabsComponent,
  ],
  exports: [LayoutComponent],
})
export class JuridicModule {}
