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
        key: 'towns',
        icon: 'towns',
        text: 'SUBMENU.TOWNS',
        url: '/management-a/submenu-a3',
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
        url: '/management-a/submenu-a5',
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
      {
        key: 'com_purpose_profiles',
        icon: 'streamline',
        text: 'SUBMENU.MODESCOM_PURPOSE_PROFILES',
        url: '/communications/purpose-profiles',
      },
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
        url: '/management-b',
      },
      {
        key: 'tipusPerson',
        icon: 'communication',
        text: 'SUBMENU.TIPUSPERSON',
        url: '/management-x',
      },
      {
        key: 'tipusPhone',
        icon: 'communication',
        text: 'SUBMENU.TIPUSPHONE',
        url: '/management-x',
      },
      {
        key: 'estatCivil',
        icon: 'communication',
        text: 'MENU.ESTATCIVIL',
        url: '/management-x',
      },
      {
        key: 'addressType',
        icon: 'adresa',
        text: 'SUBMENU.ADDRESSTYPE',
        url: '/addresstype',
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
        icon: 'communication',
        text: 'SUBMENU.ORILOPD',
        url: '/management-x',
      },
      {
        key: 'regLopd',
        icon: 'communication',
        text: 'SUBMENU.REGLOPD',
        url: '/management-x',
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
  visitroomsTypes: {
    key: 'visitroomsTypes',
    icon: 'visit-rooms',
    text: 'MENU.VISIT_ROOMS',
    url: '/visit-rooms',
  },
  subscriptiontagsTypes: {
    key: 'subscriptiontagsTypes',
    icon: 'subscriptiontags',
    text: 'MENU.SUBSCRIPTION_TAGS',
    url: '/subscription-tags',
  },
};
