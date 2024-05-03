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
import { SubTabsCliComponent } from './shared/sub-tabs-cli/sub-tabs-cli.component';
import { CliDadesGeneralsComponent } from './clients/cli-dades-generals/cli-dades-generals.component';
import { CliDadesBancariesComponent } from './clients/cli-dades-bancaries/cli-dades-bancaries.component';
import { CliFacturacioComponent } from './clients/cli-facturacio/cli-facturacio.component';
import { CliExpedientsComponent } from './clients/cli-expedients/cli-expedients.component';
import { CliDocumentsComponent } from './clients/cli-documents/cli-documents.component';
import { CliRelacioClientsComponent } from './clients/cli-relacio-clients/cli-relacio-clients.component';
import { CliIncidenciesComponent } from './clients/cli-incidencies/cli-incidencies.component';
import { CliComunicacionsComponent } from './clients/cli-comunicacions/cli-comunicacions.component';
import { CliHistoricAbonamentsComponent } from './clients/cli-historic-abonaments/cli-historic-abonaments.component';
import { CliLopdComponent } from './clients/cli-lopd/cli-lopd.component';
import { CliDadesJuridiquesComponent } from './clients/cli-dades-juridiques/cli-dades-juridiques.component';

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
    SubTabsCliComponent,
    CliDadesGeneralsComponent,
    CliDadesBancariesComponent,
    CliFacturacioComponent,
    CliExpedientsComponent,
    CliDocumentsComponent,
    CliRelacioClientsComponent,
    CliIncidenciesComponent,
    CliComunicacionsComponent,
    CliHistoricAbonamentsComponent,
    CliLopdComponent,
    CliDadesJuridiquesComponent,
  ],
  exports: [LayoutComponent],
})
export class JuridicModule {}
