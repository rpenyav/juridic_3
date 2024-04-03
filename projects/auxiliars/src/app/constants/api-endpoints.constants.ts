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
    PROVINCIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/provinces/paged?page=0&pagesize=10`,
    AUTONOMIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/autonomous_regions`,
    COMARCS_ENDPOINT: `${environment.apiBaseUrl}/${language}/comarca`,
    COUNTRIES_ENDPOINT: `${environment.apiBaseUrl}/${language}/countries`,
    FOLDERS_ENDPOINT: `${environment.apiBaseUrl}/${language}/folder_types`,
    COMMUNICATIONS_PURPOSE: `${environment.apiBaseUrl}/${language}/communication_purposes`,
    COMMUNICATIONS_MODES: `${environment.apiBaseUrl}/${language}/communication_modes`,
    COMMUNICATIONS_TYPES: `${environment.apiBaseUrl}/${language}/communication_types`,
    COMMUNICATIONS_PURPOSE_PROFILES: `${environment.apiBaseUrl}/${language}/communication_purposes_profiles`,
    VISIT_ROOMS: `${environment.apiBaseUrl}/${language}/visit_rooms`,
    SUBSCRIPTION_TAGS: `${environment.apiBaseUrl}/${language}/subscription_tags`,
    COMP_REL_TYPES: `${environment.apiBaseUrl}/${language}/company_relation_types`,
    EXPEDIENTS_FOLDER_STATES_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_folder_states`,
    EXPEDIENTS_FOLDER_TYPES_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_folder_types`,
    EXPEDIENTS_PROVINANCE_ENDPOINT: `${environment.apiBaseUrl}/${language}/expedient_provenances`,
  };
}
