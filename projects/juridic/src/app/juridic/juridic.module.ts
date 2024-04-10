import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuridicComponent } from './juridic/juridic.component';
import { RouterModule } from '@angular/router';
import { JURIDIC_ROUTES } from './juridic.routes';
import { SharedLibModule } from 'shared-lib';
import { HeaderComponent, FooterComponent, LayoutComponent } from './layout';
import { CercadorGlobalComponent } from './shared/cercador-global/cercador-global.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { ExpCercadorComponent } from './expedientes/exp-cercador/exp-cercador.component';
import { ClientsComponent } from './clients/clients.component';
import { CliCercadorComponent } from './clients/cli-cercador/cli-cercador.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExpByIdComponent } from './expedientes/exp-by-id/exp-by-id.component';
import { ExpTableComponent } from './expedientes/exp-table/exp-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(JURIDIC_ROUTES),
  ],
  declarations: [
    JuridicComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    CercadorGlobalComponent,
    ExpedientesComponent,
    ExpCercadorComponent,
    ClientsComponent,
    CliCercadorComponent,
    NotFoundComponent,
    ExpByIdComponent,
    ExpTableComponent,
  ],
  exports: [LayoutComponent],
})
export class JuridicModule {}
