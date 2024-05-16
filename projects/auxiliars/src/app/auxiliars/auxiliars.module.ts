import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AUXILIAR_ROUTES } from './auxiliars.routes';
import { SharedLibModule } from 'shared-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AuxFooterComponent } from './layout/footer/aux-footer.component';
import { GeneralFooterComponent } from './layout/footer/generalfooter.component';
import { BanksComponent } from './pages/banks/banks.component';
import { CarpetasComponent } from './pages/carpetas/carpetas.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';
import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FilterComponent } from './shared/filter/filter.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';

import { SettingsComponent } from './pages/settings/settings.component';
import { FilterInputComponent } from './shared/filter-input/filter-input.component';
import { FormularioComponent } from './shared/formulario/formulario.component';
import { CustomTableComponent } from './shared/custom-table/custom-table.component';
import { GenericFormComponent } from './shared/generic-form/generic-form.component';
import { AdresstypesDetailComponent } from './pages/adresstypes/adresstypes-detail.component';

import { AutonomousRegionsComponent } from './pages/autonomous-regions/autonomous-regions.component';
import { AutonomousRegionsDetailComponent } from './pages/autonomous-regions/autonomous-regions-detail.component';
import { CnaeDetailComponent } from './pages/cnae/cnae-detail.component';
import { ComarcsComponent } from './pages/comarcs/comarcs.component';
import { ComarcsDetailComponent } from './pages/comarcs/comarcs-detail.component';
import { EditComponent } from './shared/edit/edit.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { FoldersDetailComponent } from './pages/folders/folders-detail.component';
import { CommunicationModesComponent } from './pages/communication-modes/communication-modes.component';
import { CommunicationTypesComponent } from './pages/communication-types/communication-types.component';
import { CommunicationPurposeComponent } from './pages/communication-purpose/communication-purpose.component';
import { CommunicationPurposeProfilesComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles.component';
import { CommunicationPurposeDetailComponent } from './pages/communication-purpose/communication-purpose-detail.component';
import { CommunicationModesDetailComponent } from './pages/communication-modes/communication-modes-detail.component';
import { CommunicationTypesDetailComponent } from './pages/communication-types/communication-types-detail.component';
import { PayMethodsDetailComponent } from './pages/pay-methods/pay-methods-detail.component';
import { OperatorSwitchComponent } from './shared/operator-switch/operator-switch.component';
import { VisitRoomsComponent } from './pages/visit-rooms/visit-rooms.component';
import { VisitRoomsDetailComponent } from './pages/visit-rooms/visit-rooms-detail.component';
import { InsertComponent } from './shared/insert/insert.component';
import { SubscriptionTagsComponent } from './pages/subscriptions/subscription-tags/subscription-tags.component';
import { SubscriptionTagDetailComponent } from './pages/subscriptions/subscription-tags/subscription-tags-detail.component';
import { CommunicationPurposeProfilesDetailComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles-detail.component';
import { CompanyRelationTypesDetailComponent } from './pages/company_relation_types/company_relation_types-detail.component';
import { CompanyRelationTypesComponent } from './pages/company_relation_types/company_relation_types.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountriesDetailComponent } from './pages/countries/countries-detail.component';
import { DocumentstypesDetailComponent } from './pages/document_types/document_types-detail.component';
import { EconomicProceduretypesComponent } from './pages/economic_procedure_types/economic_procedure_types.component';
import { EconomicProceduretypesDetailComponent } from './pages/economic_procedure_types/economic_procedure_types-detail.component';
import { ExpedientFolderStatesComponent } from './pages/expedient_folder_states/expedient_folder_states.component';
import { ExpedientFolderStatesDetailComponent } from './pages/expedient_folder_states/expedient_folder_states-detail.component';
import { ExpedientFolderTypesComponent } from './pages/expedient_folder_types/expedient_folder_types.component';
import { ExpedientFolderTypesDetailComponent } from './pages/expedient_folder_types/expedient_folder_types-detail.component';
import { ExpedientProvenanceComponent } from './pages/expedient_provenance/expedient_provenance.component';
import { ExpedientProvenanceDetailComponent } from './pages/expedient_provenance/expedient_provenance-detail.component';
import { VisitTypesComponent } from './pages/visit-types/visit-types.component';
import { VisitTypesDetailComponent } from './pages/visit-types/visit-types-detail.component';
import { VatPercentagesComponent } from './pages/vat-percentages/vat-percentages.component';
import { VatPercentagesDetailComponent } from './pages/vat-percentages/vat-percentages-detail.component';
import { SubscriptionTypeComponent } from './pages/subscriptions/subscription-types/subscription-types.component';
import { SubscriptionTypeDetailComponent } from './pages/subscriptions/subscription-types/subscription-types-detail.component';
import { SubscriptionCoveragesComponent } from './pages/subscriptions/subscription-coverages/subscription-coverages.component';
import { SubscriptionCoveragesDetailComponent } from './pages/subscriptions/subscription-coverages/subscription-coverages-detail.component';
import { SubscriptionDurationsComponent } from './pages/subscriptions/subscription-durations/subscription-durations.component';
import { SubscriptionDurationsDetailComponent } from './pages/subscriptions/subscription-durations/subscription-durations-detail.component';
import { SubscriptionParentalsComponent } from './pages/subscriptions/subscription-parentals/subscription-parentals.component';
import { SubscriptionParentalsDetailComponent } from './pages/subscriptions/subscription-parentals/subscription-parentals-detail.component';
import { SubscriptionProceduresComponent } from './pages/subscriptions/subscription-procedures/subscription-procedures.component';
import { SubscriptionProceduresDetailComponent } from './pages/subscriptions/subscription-procedures/subscription-procedures-detail.component';
import { ExpedientFolderSubjectsComponent } from './pages/expedient_folder_subjects/expedient_folder_subjects.component';
import { ExpedientFolderSubjectsDetailComponent } from './pages/expedient_folder_subjects/expedient_folder_subjects-detail.component';
import { FestivityDaysComponent } from './pages/festivity_days/festivity_days.component';
import { FestivityDaysDetailComponent } from './pages/festivity_days/festivity_days-detail.component';
import { FestivityYearsComponent } from './pages/festivity_years/festivity_years.component';
import { FestivityYearsDetailComponent } from './pages/festivity_years/festivity_years-detail.component';
import { GeneresComponent } from './pages/generes/generes.component';
import { GeneresDetailComponent } from './pages/generes/generes-detail.component';
import { SubscriptionStatusComponent } from './pages/subscriptions/subscription-status/subscription-status.component';
import { SubscriptionStatusDetailComponent } from './pages/subscriptions/subscription-status/subscription-status-detail.component';
import { ReturnReasonsComponent } from './pages/return-reasons/return-reasons.component';
import { RelationTypesComponent } from './pages/relation-types/relation-types.component';
import { RelationTypesDetailComponent } from './pages/relation-types/relation-types-detail.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { ProfilesDetailComponent } from './pages/profiles/profiles-detail.component';
import { ProfessionsComponent } from './pages/professions/professions.component';
import { ProfessionsDetailComponent } from './pages/professions/professions-detail.component';
import { PostalCodesComponent } from './pages/localizations/postal-codes/postal-codes.component';
import { PersonTypesComponent } from './pages/person-types/person-types.component';
import { PersonTypesDetailComponent } from './pages/person-types/person-types-detail.component';
import { OfficesComponent } from './pages/offices/offices.component';
import { OfficesDetailComponent } from './pages/offices/offices-detail.component';
import { NacionalitiesComponent } from './pages/nacionalities/nacionalities.component';
import { NacionalitiesDetailComponent } from './pages/nacionalities/nacionalities-detail.component';
import { MunicipalitiesComponent } from './pages/localizations/municipalities/municipalities.component';
import { MunicipalitiesDetailComponent } from './pages/localizations/municipalities/municipalities-detail.component';
import { MaritalStatusComponent } from './pages/marital-status/marital-status.component';
import { MaritalStatusDetailComponent } from './pages/marital-status/marital-status-detail.component';
import { LopdRegulationsComponent } from './pages/lopd/lopd-regulations/lopd-regulations.component';
import { LopdRegulationsDetailComponent } from './pages/lopd/lopd-regulations/lopd-regulations-detail.component';
import { LopdOriginsComponent } from './pages/lopd/lopd-origins/lopd-origins.component';
import { LopdOriginsDetailComponent } from './pages/lopd/lopd-origins/lopd-origins-detail.component';
import { LegalRepresentationsComponent } from './pages/legal-representations/legal-representations.component';
import { LegalRepresentationsDetailComponent } from './pages/legal-representations/legal-representations-detail.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { LanguagesDetailComponent } from './pages/languages/languages-detail.component';
import { InvoiceSeriesComponent } from './pages/invoice-series/invoice-series.component';
import { InvoiceSeriesDetailComponent } from './pages/invoice-series/invoice-series-detail.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { DocumentstypesComponent } from './pages/document_types/document_types.component';
import { AdresstypesComponent } from './pages/adresstypes/adresstypes.component';
import { AuxHeaderComponent } from './layout/header/aux-header.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { DomainsDetailComponent } from './pages/domains/domains-detail.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';
import { BanksDetailComponent } from './pages/banks/banks-detail.component';
import { GroupsDetailComponent } from './pages/groups/groups-detail.component';
import { ReturnReasonsDetailComponent } from './pages/return-reasons/return-reasons-detail.component';
import { PostalCodesDetailComponent } from './pages/localizations/postal-codes/postal-codes-detail.component';
import { HomeComponent } from '../home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AutocompleteComponent } from './shared/autocomplete/autocomplete.component';
import { SearchComponent } from './shared/search/search.component';
import { GeneralHeaderComponent } from './layout/header/generalheader.component';

import { AuxiliarsComponent } from './auxiliars/auxiliars.component';
import { GeneralLayoutComponent } from './layout/generallayout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AUXILIAR_ROUTES),
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    SharedLibModule,
  ],
  declarations: [
    AuxiliarsComponent,
    HomeComponent,
    AuxHeaderComponent,
    AuxFooterComponent,
    LayoutComponent,
    // LoginComponent,
    BanksComponent,
    CarpetasComponent,
    DomainsComponent,
    DomainsDetailComponent,
    CnaeComponent,
    DocumentsComponent,
    PayMethodsComponent,
    ParametersComponent,
    ProEcoComponent,
    RelEmpresasComponent,
    RepLegalsComponent,

    PaginatorComponent,
    LoaderComponent,
    FilterComponent,
    DynamicDetailComponent,

    BanksDetailComponent,
    SettingsComponent,
    FilterInputComponent,
    FormularioComponent,
    CustomTableComponent,
    GenericFormComponent,
    AdresstypesComponent,
    AdresstypesDetailComponent,
    SearchComponent,
    AutonomousRegionsComponent,
    AutonomousRegionsDetailComponent,
    CnaeDetailComponent,
    ComarcsComponent,
    ComarcsDetailComponent,
    EditComponent,
    FoldersComponent,
    FoldersDetailComponent,
    CommunicationModesComponent,
    CommunicationTypesComponent,
    CommunicationPurposeComponent,
    CommunicationPurposeProfilesComponent,
    CommunicationPurposeProfilesDetailComponent,
    CommunicationPurposeDetailComponent,
    CommunicationModesDetailComponent,
    CommunicationTypesDetailComponent,
    PayMethodsDetailComponent,
    OperatorSwitchComponent,
    VisitRoomsComponent,
    VisitRoomsDetailComponent,
    InsertComponent,
    SubscriptionTagsComponent,
    SubscriptionTagDetailComponent,
    CompanyRelationTypesDetailComponent,
    CompanyRelationTypesComponent,
    CountriesComponent,
    CountriesDetailComponent,
    DocumentstypesComponent,
    DocumentstypesDetailComponent,
    EconomicProceduretypesComponent,
    EconomicProceduretypesDetailComponent,
    ExpedientFolderStatesComponent,
    ExpedientFolderStatesDetailComponent,
    ExpedientFolderTypesComponent,
    ExpedientFolderTypesDetailComponent,
    ExpedientProvenanceComponent,
    ExpedientProvenanceDetailComponent,
    ExpedientFolderSubjectsComponent,
    ExpedientFolderSubjectsDetailComponent,
    FestivityDaysComponent,
    FestivityDaysDetailComponent,
    FestivityYearsComponent,
    FestivityYearsDetailComponent,
    GeneresComponent,
    GeneresDetailComponent,
    VisitTypesComponent,
    VisitTypesDetailComponent,
    VatPercentagesComponent,
    VatPercentagesDetailComponent,
    SubscriptionTypeComponent,
    SubscriptionTypeDetailComponent,
    SubscriptionCoveragesComponent,
    SubscriptionCoveragesDetailComponent,
    SubscriptionDurationsComponent,
    SubscriptionDurationsDetailComponent,
    SubscriptionParentalsComponent,
    SubscriptionParentalsDetailComponent,
    SubscriptionProceduresComponent,
    SubscriptionProceduresDetailComponent,
    AutocompleteComponent,
    SubscriptionStatusComponent,
    SubscriptionStatusDetailComponent,
    ReturnReasonsComponent,
    ReturnReasonsDetailComponent,
    RelationTypesComponent,
    RelationTypesDetailComponent,
    ProfilesComponent,
    ProfilesDetailComponent,
    ProfessionsComponent,
    ProfessionsDetailComponent,
    PostalCodesComponent,
    PostalCodesDetailComponent,
    PersonTypesComponent,
    PersonTypesDetailComponent,
    OfficesComponent,
    OfficesDetailComponent,
    NacionalitiesComponent,
    NacionalitiesDetailComponent,
    MunicipalitiesComponent,
    MunicipalitiesDetailComponent,
    MaritalStatusComponent,
    MaritalStatusDetailComponent,
    LopdRegulationsComponent,
    LopdRegulationsDetailComponent,
    LopdOriginsComponent,
    LopdOriginsDetailComponent,
    LegalRepresentationsComponent,
    LegalRepresentationsDetailComponent,
    LanguagesComponent,
    LanguagesDetailComponent,
    InvoiceSeriesComponent,
    InvoiceSeriesDetailComponent,
    GroupsComponent,
    GroupsDetailComponent,
    GeneralFooterComponent,
    GeneralHeaderComponent,
    GeneralLayoutComponent,
  ],
  exports: [LayoutComponent],
})
export class AuxiliarsModule {}
