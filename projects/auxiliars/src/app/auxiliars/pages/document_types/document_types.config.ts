import { Validators } from '@angular/forms';

export const DOCUMENTS_TYPES_COLUMNS_CONFIG = (context: any) => [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
    direction: 'ASC',
    width: '10%',
    action: (row: any) =>
      row?.id
        ? context.viewDetails(row.id)
        : console.warn('Row is undefined or has no ID'),
  },
  {
    key: 'literalDescriptionText',
    label: 'Name',
    sortable: true,
    direction: 'ASC',
    width: '80%',
  },

  {
    key: 'actions',
    label: 'Actions',
    sortable: false,
    type: 'actions',
    direction: 'ASC',
    width: '10%',
    action: (row: any) =>
      row?.id
        ? context.viewDetails(row.id)
        : console.warn('Row is undefined or has no ID'),
  },
];

export const DOCUMENTS_TYPES_SEARCH_CRITERIA = [
  {
    field: 'literalDescriptionText',
    operator: 'contains',
    value: '',
    label: 'Texto Literal',
    minLength: 1,
    type: 'string' as 'string',
  },
];

export const DOCUMENTS_TYPES_FORM_CONFIG = [
  { key: 'literalDescriptionText', label: 'Name', validators: [] },
];
