//import { environment } from 'src/environments/environment.prod';

import { environment } from '../../environments/environment';

function mapLanguageToNumber(languageCode: string): number {
  const languageMap: { [key: string]: number } = {
    es: 1,
    en: 2,
    ca: 3,
  };

  return languageMap[languageCode] || 1;
}

export function getApiEndpoints() {
  const languageCode = localStorage.getItem('userLang') ?? 'es';
  const language = mapLanguageToNumber(languageCode);

  return {
    LOGIN: `${environment.apiBaseUrl}/login`,
    ADDRESS_TYPES_ENDPOINT: `${environment.apiBaseUrl}/${language}/address_types`,
    BANKS_ENDPOINT: `${environment.apiBaseUrl}/${language}/banks`,
    CARPETAS_ENDPOINT: `${environment.apiBaseUrl}/${language}/banks`,
    DOMAINS_ENDPOINT: `${environment.apiBaseUrl}/${language}/domains`,
    CNAE_ENDPOINT: `${environment.apiBaseUrl}/${language}/cnae`,
    DOCUMENTS_ENDPOINT: `${environment.apiBaseUrl}/${language}/domains`,
    DOCUMENTS_TYPES_ENDPOINT: `${environment.apiBaseUrl}/${language}/document_types`,
    PAY_METHODS: `${environment.apiBaseUrl}/${language}/payment_methods`,
    PRO_ECO: `${environment.apiBaseUrl}/${language}/economic_procedure_types`,
    REP_LEGAL_ENDPOINT: `${environment.apiBaseUrl}/${language}/domains`,
    PROVINCIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/provinces`,
    AUTONOMIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/autonomous_regions`,
    COMARCS_ENDPOINT: `${environment.apiBaseUrl}/${language}/comarca`,
    COUNTRIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/countries`,
    FOLDERS_ENDPOINT: `${environment.apiBaseUrl}/${language}/folder_types`,
    COMMUNICATIONS_PURPOSE: `${environment.apiBaseUrl}/${language}/communication_purposes`,
    COMMUNICATIONS_MODES: `${environment.apiBaseUrl}/${language}/communication_modes`,
    COMMUNICATIONS_TYPES: `${environment.apiBaseUrl}/${language}/communication_types`,
    COMMUNICATIONS_PURPOSE_PROFILES: `${environment.apiBaseUrl}/${language}/communication_purpose_profiles`,
    VISIT_ROOMS: `${environment.apiBaseUrl}/${language}/visit_rooms`,
    SUBSCRIPTION_TAGS: `${environment.apiBaseUrl}/${language}/subscription_tags`,
    COMP_REL_TYPES: `${environment.apiBaseUrl}/${language}/company_relation_types`,
    EXPEDIENTS_FOLDER_STATES_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_folder_states`,
    EXPEDIENTS_FOLDER_TYPES_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_folder_types`,
    EXPEDIENTS_PROVINANCE_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_provenances`,
    EXPEDIENTS_SUBJECTS_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_folder_subjects`,
    VISIT_TYPES: `${environment.apiBaseUrl}/${language}/visit_types`,
    VAT_PERCENTAGES: `${environment.apiBaseUrl}/${language}/vat_percentages`,
    SUBSCRIPTION_TYPE: `${environment.apiBaseUrl}/${language}/subscription_types`,
    SUBSCRIPTION_COVERAGE: `${environment.apiBaseUrl}/${language}/subscription_coverages`,
    SUBSCRIPTION_DURATIONS: `${environment.apiBaseUrl}/${language}/subscription_durations`,
    SUBSCRIPTION_PARENTALS: `${environment.apiBaseUrl}/${language}/subscription_parentals`,
    SUBSCRIPTION_PROCEDURES: `${environment.apiBaseUrl}/${language}/subscription_procedures`,
    FESTIVITY_DAYS_ENDPOINT: `${environment.apiBaseUrl}/${language}/festivity_days`,
    FESTIVITY_YEARS_ENDPOINT: `${environment.apiBaseUrl}/${language}/festivity_years`,
    GENERES_ENDPOINT: `${environment.apiBaseUrl}/${language}/genders`,
    CALENDARS: `${environment.apiBaseUrl}/${language}/calendars`,
    SUBSCRIPTION_STATUS: `${environment.apiBaseUrl}/${language}/subscription_status`,
    SUBSCRIPTION_PHASES: `${environment.apiBaseUrl}/${language}/subscription_procedure_phases`,
    RETURN_REASONS: `${environment.apiBaseUrl}/${language}/return_reasons`,
    RELATION_TYPES: `${environment.apiBaseUrl}/${language}/relation_types`,
    PROFILES: `${environment.apiBaseUrl}/${language}/profiles`,
    PROFESSIONS: `${environment.apiBaseUrl}/${language}/professions`,
    POSTAL_CODES: `${environment.apiBaseUrl}/${language}/postal_codes`,
    PERSON_TYPES: `${environment.apiBaseUrl}/${language}/person_types`,
    OFFICES: `${environment.apiBaseUrl}/${language}/offices`,
    NACIONALITIES: `${environment.apiBaseUrl}/${language}/nationality`,
    MUNICIPALITIES: `${environment.apiBaseUrl}/${language}/municipalities`,
    MARITAL_STATUS: `${environment.apiBaseUrl}/${language}/marital_status`,
    LOPD_REGULATIONS: `${environment.apiBaseUrl}/${language}/lopd_regulations`,
    LOPD_ORIGINS: `${environment.apiBaseUrl}/${language}/lopd_origin_types`,
    LEGAL_REPRESENTATIONS: `${environment.apiBaseUrl}/${language}/legal_representation_types`,
    LANGUAGES: `${environment.apiBaseUrl}/${language}/languages`,
    INVOICE_SERIES: `${environment.apiBaseUrl}/${language}/invoice_series`,
    GROUPS: `${environment.apiBaseUrl}/${language}/groups`,
  };
}
