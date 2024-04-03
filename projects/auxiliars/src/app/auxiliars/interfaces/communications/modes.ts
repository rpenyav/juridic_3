export interface ComModes {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalNameText: string;
  telematic: boolean;
  attachmentsAllowed: boolean;
}

export interface PaginatedResponse {
  allData: ComModes[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: ComModes[];
}
