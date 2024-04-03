import { Routes } from '@angular/router';
import { AuxiliarsComponent } from './auxiliars/auxiliars.component';
import { HomeComponent } from '../home/home.component';
import { AdresstypesComponent } from './pages/adresstypes/adresstypes.component';
import { AutonomousRegionsComponent } from './pages/autonomous-regions/autonomous-regions.component';
import { BanksComponent } from './pages/banks/banks.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { ComarcsComponent } from './pages/comarcs/comarcs.component';
import { CommunicationModesComponent } from './pages/communication-modes/communication-modes.component';
import { CommunicationPurposeProfilesComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles.component';
import { CommunicationPurposeComponent } from './pages/communication-purpose/communication-purpose.component';
import { CommunicationTypesComponent } from './pages/communication-types/communication-types.component';
import { CompanyRelationTypesComponent } from './pages/company_relation_types/company_relation_types.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DocumentstypesComponent } from './pages/document_types/document_types.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { EconomicProceduretypesComponent } from './pages/economic_procedure_types/economic_procedure_types.component';
import { ExpedientFolderStatesComponent } from './pages/expedient_folder_states/expedient_folder_states.component';
import { ExpedientFolderTypesComponent } from './pages/expedient_folder_types/expedient_folder_types.component';
import { ExpedientProvenanceComponent } from './pages/expedient_provenance/expedient_provenance.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';

import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubscriptionTagsComponent } from './pages/subscription-tags/subscription-tags.component';
import { VisitRoomsComponent } from './pages/visit-rooms/visit-rooms.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';

export const AUXILIAR_ROUTES: Routes = [
  {
    path: 'auxiliars',
    component: AuxiliarsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'addresstype',
    component: AdresstypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'banks',
    component: BanksComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'folder-types',
    component: FoldersComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'domains',
    component: DomainsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'cnae',
    component: CnaeComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'rep-legal',
    component: RepLegalsComponent,
    //canActivate: [canActivate],
  },

  {
    path: 'pro-eco',
    component: ProEcoComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'pay-methods',
    component: PayMethodsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'parameters',
    component: ParametersComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'rel-empresas',
    component: RelEmpresasComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'rep-legal',
    component: RepLegalsComponent,
    //canActivate: [canActivate],
  },
  // {
  //   path: 'locations/provinces',
  //   component: ProvincesComponent,
  //   //canActivate: [canActivate],
  // },
  {
    path: 'locations/autonomous-regions',
    component: AutonomousRegionsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'locations/regions',
    component: ComarcsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'locations/countries',
    component: CountriesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'communications/purpose',
    component: CommunicationPurposeComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'communications/purpose-profiles',
    component: CommunicationPurposeProfilesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'communications/modes',
    component: CommunicationModesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'communications/types',
    component: CommunicationTypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: ':category/:type/:id',
    component: DynamicDetailComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'visit-rooms',
    component: VisitRoomsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'subscription-tags',
    component: SubscriptionTagsComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'company_relation_types',
    component: CompanyRelationTypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'documents-type',
    component: DocumentstypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'economics-procedure-type',
    component: EconomicProceduretypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'expedients/folder-states',
    component: ExpedientFolderStatesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'expedients/exp-folder-types',
    component: ExpedientFolderTypesComponent,
    //canActivate: [canActivate],
  },
  {
    path: 'expedients/provenance',
    component: ExpedientProvenanceComponent,
    //canActivate: [canActivate],
  },
];
