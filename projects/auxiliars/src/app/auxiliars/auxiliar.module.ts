import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuxiliarsComponent } from './auxiliars/auxiliars.component';
import { RouterModule } from '@angular/router';
import { AUXILIAR_ROUTES } from './auxiliars.routes';
import { SharedLibModule } from 'shared-lib';
import { AdresstypesDetailComponent } from './pages/adresstypes/adresstypes-detail.component';
import { AdresstypesComponent } from './pages/adresstypes/adresstypes.component';
import { AutonomousRegionsDetailComponent } from './pages/autonomous-regions/autonomous-regions-detail.component';
import { AutonomousRegionsComponent } from './pages/autonomous-regions/autonomous-regions.component';
import { BanksDetailComponent } from './pages/banks/banks-detail.component';
import { BanksComponent } from './pages/banks/banks.component';
import { CarpetasComponent } from './pages/carpetas/carpetas.component';
import { CnaeDetailComponent } from './pages/cnae/cnae-detail.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { ComarcsDetailComponent } from './pages/comarcs/comarcs-detail.component';
import { ComarcsComponent } from './pages/comarcs/comarcs.component';
import { CommunicationModesDetailComponent } from './pages/communication-modes/communication-modes-detail.component';
import { CommunicationModesComponent } from './pages/communication-modes/communication-modes.component';
import { CommunicationPurposeProfilesDetailComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles-detail.component';
import { CommunicationPurposeProfilesComponent } from './pages/communication-purpose-profiles/communication-purpose-profiles.component';
import { CommunicationPurposeDetailComponent } from './pages/communication-purpose/communication-purpose-detail.component';
import { CommunicationPurposeComponent } from './pages/communication-purpose/communication-purpose.component';
import { CommunicationTypesDetailComponent } from './pages/communication-types/communication-types-detail.component';
import { CommunicationTypesComponent } from './pages/communication-types/communication-types.component';
import { CompanyRelationTypesDetailComponent } from './pages/company_relation_types/company_relation_types-detail.component';
import { CompanyRelationTypesComponent } from './pages/company_relation_types/company_relation_types.component';
import { CountriesDetailComponent } from './pages/countries/countries-detail.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DocumentstypesDetailComponent } from './pages/document_types/document_types-detail.component';
import { DocumentstypesComponent } from './pages/document_types/document_types.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { DomainsDetailComponent } from './pages/domains/domains-detail.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { EconomicProceduretypesDetailComponent } from './pages/economic_procedure_types/economic_procedure_types-detail.component';
import { EconomicProceduretypesComponent } from './pages/economic_procedure_types/economic_procedure_types.component';
import { ExpedientFolderStatesDetailComponent } from './pages/expedient_folder_states/expedient_folder_states-detail.component';
import { ExpedientFolderStatesComponent } from './pages/expedient_folder_states/expedient_folder_states.component';
import { ExpedientFolderTypesDetailComponent } from './pages/expedient_folder_types/expedient_folder_types-detail.component';
import { ExpedientFolderTypesComponent } from './pages/expedient_folder_types/expedient_folder_types.component';
import { ExpedientProvenanceDetailComponent } from './pages/expedient_provenance/expedient_provenance-detail.component';
import { ExpedientProvenanceComponent } from './pages/expedient_provenance/expedient_provenance.component';
import { FoldersDetailComponent } from './pages/folders/folders-detail.component';
import { FoldersComponent } from './pages/folders/folders.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { PayMethodsDetailComponent } from './pages/pay-methods/pay-methods-detail.component';
import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';

import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubscriptionTagDetailComponent } from './pages/subscription-tags/subscription-tags-detail.component';
import { SubscriptionTagsComponent } from './pages/subscription-tags/subscription-tags.component';
import { VisitRoomsDetailComponent } from './pages/visit-rooms/visit-rooms-detail.component';
import { VisitRoomsComponent } from './pages/visit-rooms/visit-rooms.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CustomTableComponent } from './shared/custom-table/custom-table.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';
import { EditComponent } from './shared/edit/edit.component';
import { FilterInputComponent } from './shared/filter-input/filter-input.component';
import { FilterComponent } from './shared/filter/filter.component';
import { FormularioComponent } from './shared/formulario/formulario.component';
import { GenericFormComponent } from './shared/generic-form/generic-form.component';
import { InsertComponent } from './shared/insert/insert.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { OperatorSwitchComponent } from './shared/operator-switch/operator-switch.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { SearchComponent } from './shared/search/search.component';

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
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
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
    FilterInputComponent,
    FormularioComponent,
    CustomTableComponent,
    GenericFormComponent,
    EditComponent,
    SearchComponent,
    OperatorSwitchComponent,
    InsertComponent,
    BanksDetailComponent,
    SettingsComponent,

    AdresstypesComponent,
    AdresstypesDetailComponent,

    AutonomousRegionsComponent,
    AutonomousRegionsDetailComponent,
    CnaeDetailComponent,
    ComarcsComponent,
    ComarcsDetailComponent,

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

    VisitRoomsComponent,
    VisitRoomsDetailComponent,

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
  ],
})
export class AuxiliarModule {}
