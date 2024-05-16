export interface Nacionalities {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: Nacionalities[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Nacionalities[];
}
