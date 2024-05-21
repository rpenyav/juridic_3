// languages.config.ts

import { EditInterface } from '../../interfaces/editInterface';
import { Languages } from '../../interfaces/languages';

export const LANGUAGES_COLUMNS_CONFIG = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
    direction: 'ASC',
    width: '5%',
  },
  {
    key: 'code',
    label: 'code',
    sortable: true,
    direction: 'ASC',
    width: '5%',
  },
  {
    key: 'literalDescriptionText',
    label: 'name',
    sortable: true,
    direction: 'ASC',
    width: '65%',
  },
  {
    key: 'active',
    label: 'active',
    sortable: false,
    direction: 'ASC',
    width: '10%',
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    type: 'actions',
    direction: 'ASC',
    width: '10%',
    action: (row: any, component: any) => component.viewDetails(row.id),
  },
];

export const LANGUAGES_SEARCH_CRITERIA = [
  {
    field: 'literalDescriptionText',
    operator: 'contains',
    value: '',
    label: 'Texto Literal',
    minLength: 1,
    type: 'string' as 'string',
  },
];
