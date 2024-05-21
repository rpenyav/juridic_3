import { Validators } from '@angular/forms';

export const CNAE_COLUMNS_CONFIG = (context: any) => [
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
    width: '60%',
  },
  {
    key: 'code',
    label: 'Codi',
    sortable: true,
    direction: 'ASC',
    width: '20%',
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

export const CNAE_SEARCH_CRITERIA = [
  {
    field: 'literalDescriptionText',
    operator: 'contains',
    value: '',
    label: 'Texto Literal',
    minLength: 1,
    type: 'string' as 'string',
  },
  {
    field: 'code',
    operator: 'greater',
    value: '',
    label: 'Codi',
    minLength: 1,
    type: 'number' as 'number',
  },
];

export const CNAE_FORM_CONFIG = [
  { key: 'literalDescriptionText', label: 'Name', validators: [] },
  {
    key: 'code',
    label: 'Codi',
    type: 'text',
    validators: [Validators.maxLength(4)],
    maxlength: 4,
  },
];
