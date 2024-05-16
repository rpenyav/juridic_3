import { MenuItem } from '../../interfaces/menu';

export const MENU_ITEMS: { [key: string]: MenuItem } = {
  documents: {
    key: 'documentsTy',
    icon: 'documents',
    text: 'MENU.DOCUMENTS',
    url: '/documents',
  },
  documentsType: {
    key: 'documentsType',
    icon: 'documents',
    text: 'MENU.DOCUMENTS-TYPE',
    url: '/documents-type',
  },
  domainsType: {
    key: 'domainsType',
    icon: 'dominis',
    text: 'MENU.DOMINIS',
    url: '/domains',
  },
  banksType: {
    key: 'banksType',
    icon: 'banking',
    text: 'MENU.BANCS',
    url: '/banks',
  },
  foldersType: {
    key: 'foldersType',
    icon: 'carpetes',
    text: 'MENU.FOLDERS',
    url: '/folder-types',
  },
  localitTypes: {
    key: 'localitTypes',
    icon: 'locations',
    text: 'MENU.LOCALIT',
    url: '/management-a',
    children: [
      {
        key: 'countries',
        icon: 'countries',
        text: 'SUBMENU.COUNTRIES',
        url: '/locations/countries',
      },
      {
        key: 'provinces',
        icon: 'province',
        text: 'SUBMENU.PROVINCES',
        url: '/locations/provinces',
      },
      {
        key: 'communities',
        icon: 'autonomies',
        text: 'SUBMENU.COMMUNITIES',
        url: '/locations/autonomous-regions',
      },
      {
        key: 'municipalities',
        icon: 'municipalities',
        text: 'SUBMENU.TOWNS',
        url: '/municipalities',
      },
      {
        key: 'comarcs',
        icon: 'comarca',
        text: 'SUBMENU.COMARCS',
        url: '/locations/regions',
      },
      {
        key: 'postalCodes',
        icon: 'postal',
        text: 'SUBMENU.POSTAL_CODES',
        url: '/localizations/postal-codes',
      },
      {
        key: 'poblation',
        icon: 'city',
        text: 'SUBMENU.POBLATION',
        url: '/management-a/submenu-a6',
      },
    ],
  },
  cnaeTypes: {
    key: 'cnaeTypes',
    icon: 'cnae',
    text: 'MENU.CNAE',
    url: '/cnae',
  },
  comTypes: {
    key: 'comTypes',
    icon: 'talk',
    text: 'MENU.COMUNICACIONS',
    url: '/management-a',
    children: [
      {
        key: 'com_purpose',
        icon: 'globe',
        text: 'SUBMENU.MODESCOM_PURPOSE',
        url: '/communications/purpose',
      },
      /*  {
        key: 'com_purpose_profiles',
        icon: 'streamline',
        text: 'SUBMENU.MODESCOM_PURPOSE_PROFILES',
        url: '/communications/purpose-profiles',
      },*/
      {
        key: 'com_modes',
        icon: 'walky',
        text: 'SUBMENU.MODESCOM_MODES',
        url: '/communications/modes',
      },
      {
        key: 'com_types',
        icon: 'chat',
        text: 'SUBMENU.MODESCOM_TYPES',
        url: '/communications/types',
      },
    ],
  },

  expedientTypes: {
    key: 'expedientTypes',
    icon: 'expedients',
    text: 'MENU.EXPEDIENTS',
    url: '/management-a',
    children: [
      {
        key: 'expedient_folder_states',
        icon: 'folders-browse',
        text: 'SUBMENU.EXPEDIENT_FOLDER_STATES',
        url: '/expedients/folder-states',
      },
      {
        key: 'expedient_folder_subjects',
        icon: 'folders-browse',
        text: 'SUBMENU.EXPEDIENT_FOLDER_SUBJECTS',
        url: '/expedients/folder-subjects',
      },
      {
        key: 'expedient_folder_types',
        icon: 'folders-browse',
        text: 'SUBMENU.EXPEDIENT_FOLDER_TYPES',
        url: '/expedients/exp-folder-types',
      },
      {
        key: 'expedient_provenances',
        icon: 'provenance',
        text: 'SUBMENU.EXPEDIENT_PROVENANCES',
        url: '/expedients/provenance',
      },
    ],
  },

  festivityTypes: {
    key: 'festivityTypes',
    icon: 'festivity',
    text: 'MENU.FESTIVITY',
    url: '/management-a',
    children: [
      {
        key: 'festivity_days',
        icon: 'party',
        text: 'SUBMENU.FESTIVITY_DAYS',
        url: '/festivity/festivity-days',
      },
      {
        key: 'festivity_years',
        icon: 'party',
        text: 'SUBMENU.FESTIVITY_YEARS',
        url: '/festivity/festivity-years',
      },
    ],
  },

  personesTypes: {
    key: 'personesTypes',
    icon: 'personal',
    text: 'MENU.PERSONES',
    url: '/management-a',
    children: [
      {
        key: 'generes',
        icon: 'generes',
        text: 'SUBMENU.GENERES',
        url: '/personal/genders',
      },
      {
        key: 'person-types',
        icon: 'person-types',
        text: 'SUBMENU.TIPUSPERSON',
        url: '/person-types',
      },
      {
        key: 'tipusPhone',
        icon: 'communication',
        text: 'SUBMENU.TIPUSPHONE',
        url: '/management-x',
      },
      {
        key: 'estatCivil',
        icon: 'marital-status',
        text: 'MENU.ESTATCIVIL',
        url: '/marital-status',
      },
      {
        key: 'addressType',
        icon: 'adresa',
        text: 'SUBMENU.ADDRESSTYPE',
        url: '/addresstype',
      },
      {
        key: 'relationTypes',
        icon: 'relation-types',
        text: 'SUBMENU.RELATION_TYPES',
        url: '/relation-types',
      },
      {
        key: 'profiles',
        icon: 'profiles',
        text: 'SUBMENU.PROFILES',
        url: '/profiles',
      },
      {
        key: 'professions',
        icon: 'professions',
        text: 'SUBMENU.PROFESSIONS',
        url: '/professions',
      },
      {
        key: 'nacionalities',
        icon: 'nacionalities',
        text: 'MENU.NACIONALITIES',
        url: '/nacionalities',
      },
      {
        key: 'legal-representations',
        icon: 'legal-representations',
        text: 'MENU.LEGAL_REPRESENTATIONS',
        url: '/legal-representations',
      },
    ],
  },
  lopdTypes: {
    key: 'lopdTypes',
    icon: 'lopd',
    text: 'MENU.LOPD',
    url: '/management-a',
    children: [
      {
        key: 'oriLopd',
        icon: 'lopd-origins',
        text: 'SUBMENU.ORILOPD',
        url: '/lopd-origins',
      },
      {
        key: 'regLopd',
        icon: 'lopd-regulations',
        text: 'SUBMENU.REGLOPD',
        url: '/lopd-regulations',
      },
    ],
  },
  relEmpresesTypes: {
    key: 'relEmpresesTypes',
    icon: 'company',
    text: 'MENU.EMPRESES',
    url: '/company_relation_types',
  },
  procedimentsTypes: {
    key: 'procedimentsTypes',
    icon: 'banks',
    text: 'MENU.PROCEDIMENTS',
    url: '/economics-procedure-type',
  },

  replegalsTypes: {
    key: 'replegalsTypes',
    icon: 'book',
    text: 'MENU.REPLEGALS',
    url: '/rep-legal',
  },
  parametresTypes: {
    key: 'parametresTypes',
    icon: 'settings',
    text: 'MENU.PARAMETRES',
    url: '/parameters',
  },
  metodespayTypes: {
    key: 'metodespayTypes',
    icon: 'payment',
    text: 'MENU.METODESPAY',
    url: '/pay-methods',
  },
  visits: {
    key: 'visitsTypes',
    icon: 'visits',
    text: 'MENU.VISITES',
    url: '/visits',
    children: [
      {
        key: 'visitroomsTypes',
        icon: 'visit-rooms',
        text: 'MENU.VISIT_ROOMS',
        url: '/visit-rooms',
      },
      {
        key: 'visitTypes',
        icon: 'visit-types',
        text: 'MENU.VISIT_TYPES',
        url: '/visit-types',
      },
    ],
  },
  subscriptions: {
    key: 'subscriptions',
    icon: 'subscriptions',
    text: 'MENU.SUBSCRIPTIONS',
    url: '/subscriptions',
    children: [
      {
        key: 'subscriptiontagsTypes',
        icon: 'subscriptiontags',
        text: 'MENU.SUBSCRIPTION_TAGS',
        url: '/subscription-tags',
      },
      {
        key: 'subscriptionTypeTypes',
        icon: 'subscriptionTypes',
        text: 'MENU.SUBSCRIPTION_TYPES',
        url: '/subscription-types',
      },
      {
        key: 'subscriptionCoveragesTypes',
        icon: 'subscription-coverages',
        text: 'MENU.SUBSCRIPTION_COVERAGES',
        url: '/subscription-coverages',
      },
      {
        key: 'subscriptionDurationTypes',
        icon: 'subscription-durations',
        text: 'MENU.SUBSCRIPTION_DURATIONS',
        url: '/subscription-durations',
      },
      {
        key: 'subscriptionParentalsTypes',
        icon: 'subscription-parentals',
        text: 'MENU.SUBSCRIPTION_PARENTALS',
        url: '/subscription-parentals',
      },
      {
        key: 'subscriptionProceduresTypes',
        icon: 'subscription-procedures',
        text: 'MENU.SUBSCRIPTION_PROCEDURES',
        url: '/subscription-procedures',
      },
      {
        key: 'subscriptionStatusTypes',
        icon: 'subscription-status',
        text: 'MENU.SUBSCRIPTION_STATUS',
        url: '/subscription-status',
      },
      {
        key: 'subscriptionProceduresPhases',
        icon: 'subscription-phases',
        text: 'MENU.SUBSCRIPTION_PHASES',
        url: '/subscription-phases',
      },
    ],
  },

  vatPercentagesTypes: {
    key: 'vatPercentagesTypes',
    icon: 'vat-percentages',
    text: 'MENU.VAT_PERCENTAGES',
    url: '/vat-percentages',
  },
  returnReasonsType: {
    key: 'returnReasonsType',
    icon: 'return-reasons',
    text: 'MENU.RETURN_REASONS',
    url: '/return-reasons',
  },
  offices: {
    key: 'offices',
    icon: 'offices',
    text: 'MENU.OFFICES',
    url: '/offices',
  },
  languages: {
    key: 'languages',
    icon: 'languages',
    text: 'MENU.LANGUAGES',
    url: '/languages',
  },
  invoiceSeries: {
    key: 'invoice-series',
    icon: 'invoice-series',
    text: 'MENU.INVOICE_SERIES',
    url: '/invoice-series',
  },
  groups: {
    key: 'groups',
    icon: 'groups',
    text: 'MENU.GROUPS',
    url: '/groups',
  },
};
