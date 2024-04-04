import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuridicComponent } from './juridic/juridic.component';
import { RouterModule } from '@angular/router';
import { JURIDIC_ROUTES } from './juridic.routes';

import { SharedLibModule } from 'shared-lib';
import {
  ExpedientsComponent,
  CarpetesComponent,
  DocumentacioComponent,
  CasosRelacionatsComponent,
} from './expedients';
import { HeaderComponent, FooterComponent, LayoutComponent } from './layout';
import { TabsComponent } from './shared/tabs/tabs.component';
import { CercadorGlobalComponent } from './shared/cercador-global/cercador-global.component';
import { CercaTabsComponent } from './shared/cerca-tabs/cerca-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(JURIDIC_ROUTES),
  ],
  declarations: [
    JuridicComponent,
    CarpetesComponent,
    DocumentacioComponent,
    CasosRelacionatsComponent,
    ExpedientsComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    CercadorGlobalComponent,
    CercaTabsComponent,
  ],
  exports: [LayoutComponent],
})
export class JuridicModule {}
