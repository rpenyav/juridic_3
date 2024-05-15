import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { canActivate } from './auth/guards/auth.guard';
import { BanksComponent } from './pages/banks/banks.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { ProvincesComponent } from './pages/provinces/provinces.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdresstypesComponent } from './pages/adresstypes/adresstypes.component';
import { AutonomousRegionsComponent } from './pages/autonomous-regions/autonomous-regions.component';
import { ComarcsComponent } from './pages/comarcs/comarcs.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { CommunicationModesComponent } from './pages/communication-modes/communication-modes.component';
import { CommunicationTypesComponent } from './pages/communication-types/communication-types.component';
import { CommunicationPurposeComponent } from './pages/communication-purpose/communication-purpose.component';
import { CommunicationPurposeProfilesComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { VisitRoomsComponent } from './pages/visit-rooms/visit-rooms.component';
import { SubscriptionTagsComponent } from './pages/subscriptions/subscription-tags/subscription-tags.component';
import { CompanyRelationTypesComponent } from './pages/company_relation_types/company_relation_types.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DocumentstypesComponent } from './pages/document_types/document_types.component';
import { EconomicProceduretypesComponent } from './pages/economic_procedure_types/economic_procedure_types.component';
import { ExpedientFolderStatesComponent } from './pages/expedient_folder_states/expedient_folder_states.component';
import { ExpedientFolderTypesComponent } from './pages/expedient_folder_types/expedient_folder_types.component';
import { ExpedientProvenanceComponent } from './pages/expedient_provenance/expedient_provenance.component';
import { VisitTypesComponent } from './pages/visit-types/visit-types.component';
import { VatPercentagesComponent } from './pages/vat-percentages/vat-percentages.component';
import { SubscriptionTypeComponent } from './pages/subscriptions/subscription-types/subscription-types.component';
import { SubscriptionCoveragesComponent } from './pages/subscriptions/subscription-coverages/subscription-coverages.component';
import { SubscriptionDurationsComponent } from './pages/subscriptions/subscription-durations/subscription-durations.component';
import { SubscriptionParentalsComponent } from './pages/subscriptions/subscription-parentals/subscription-parentals.component';
import { SubscriptionProceduresComponent } from './pages/subscriptions/subscription-procedures/subscription-procedures.component';
import { ExpedientFolderSubjectsComponent } from './pages/expedient_folder_subjects/expedient_folder_subjects.component';
import { FestivityDaysComponent } from './pages/festivity_days/festivity_days.component';
import { FestivityYearsComponent } from './pages/festivity_years/festivity_years.component';
import { GeneresComponent } from './pages/generes/generes.component';
import { SubscriptionStatusComponent } from './pages/subscriptions/subscription-status/subscription-status.component';
import { SubscriptionPhaseComponent } from './pages/subscriptions/subscription-procedure-phases/subscription-procedure-phases.component';
import { ReturnReasonsComponent } from './pages/return-reasons/return-reasons.component';
import { RelationTypesComponent } from './pages/relation-types/relation-types.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ProfessionsComponent } from './pages/professions/professions.component';
import { PostalCodesComponent } from './pages/localizations/return-reasons/postal-codes.component';
import { PersonTypesComponent } from './pages/person-types/person-types.component';
import { OfficesComponent } from './pages/offices/offices.component';
import { NacionalitiesComponent } from './pages/nacionalities/nacionalities.component';
import { MunicipalitiesComponent } from './pages/localizations/municipalities/municipalities.component';
import { MaritalStatusComponent } from './pages/marital-status/marital-status.component';
import { LopdRegulationsComponent } from './pages/lopd/lopd-regulations/lopd-regulations.component';
import { LopdOriginsComponent } from './pages/lopd/lopd-origins/lopd-origins.component';
import { LegalRepresentationsComponent } from './pages/legal-representations/legal-representations.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { InvoiceSeriesComponent } from './pages/invoice-series/invoice-series.component';
import { GroupsComponent } from './pages/groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/ca/home', pathMatch: 'full' },

  {
    path: ':lang',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'addresstype',
        component: AdresstypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'banks',
        component: BanksComponent,
        canActivate: [canActivate],
      },
      {
        path: 'folder-types',
        component: FoldersComponent,
        canActivate: [canActivate],
      },
      {
        path: 'domains',
        component: DomainsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'cnae',
        component: CnaeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rep-legal',
        component: RepLegalsComponent,
        canActivate: [canActivate],
      },

      {
        path: 'pro-eco',
        component: ProEcoComponent,
        canActivate: [canActivate],
      },
      {
        path: 'pay-methods',
        component: PayMethodsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'parameters',
        component: ParametersComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rel-empresas',
        component: RelEmpresasComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rep-legal',
        component: RepLegalsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'locations/provinces',
        component: ProvincesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'locations/autonomous-regions',
        component: AutonomousRegionsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'locations/regions',
        component: ComarcsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'locations/countries',
        component: CountriesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'communications/purpose',
        component: CommunicationPurposeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'communications/purpose-profiles',
        component: CommunicationPurposeProfilesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'communications/modes',
        component: CommunicationModesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'communications/types',
        component: CommunicationTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: ':category/:type/:id',
        component: DynamicDetailComponent,
        canActivate: [canActivate],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'visit-rooms',
        component: VisitRoomsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'visit-types',
        component: VisitTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'vat-percentages',
        component: VatPercentagesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-tags',
        component: SubscriptionTagsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-types',
        component: SubscriptionTypeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-coverages',
        component: SubscriptionCoveragesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-durations',
        component: SubscriptionDurationsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-parentals',
        component: SubscriptionParentalsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-procedures',
        component: SubscriptionProceduresComponent,
        canActivate: [canActivate],
      },
      {
        path: 'company_relation_types',
        component: CompanyRelationTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'documents-type',
        component: DocumentstypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'economics-procedure-type',
        component: EconomicProceduretypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'expedients/folder-states',
        component: ExpedientFolderStatesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'expedients/exp-folder-types',
        component: ExpedientFolderTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'expedients/folder-subjects',
        component: ExpedientFolderSubjectsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'expedients/provenance',
        component: ExpedientProvenanceComponent,
        canActivate: [canActivate],
      },
      {
        path: 'festivity/festivity-days',
        component: FestivityDaysComponent,
        canActivate: [canActivate],
      },
      {
        path: 'festivity/festivity-years',
        component: FestivityYearsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'personal/genders',
        component: GeneresComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-status',
        component: SubscriptionStatusComponent,
        canActivate: [canActivate],
      },
      {
        path: 'subscription-phases',
        component: SubscriptionPhaseComponent,
        canActivate: [canActivate],
      },
      {
        path: 'return-reasons',
        component: ReturnReasonsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'relation-types',
        component: RelationTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'professions',
        component: ProfessionsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'localizations/postal-codes',
        component: PostalCodesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'person-types',
        component: PersonTypesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'offices',
        component: OfficesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'nacionalities',
        component: NacionalitiesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'municipalities',
        component: MunicipalitiesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'marital-status',
        component: MaritalStatusComponent,
        canActivate: [canActivate],
      },
      {
        path: 'lopd-regulations',
        component: LopdRegulationsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'lopd-origins',
        component: LopdOriginsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'legal-representations',
        component: LegalRepresentationsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'languages',
        component: LanguagesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'invoice-series',
        component: InvoiceSeriesComponent,
        canActivate: [canActivate],
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [canActivate],
      },
    ],
  },
  { path: '**', redirectTo: '/ca/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
