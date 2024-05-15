export interface Cnae {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: Cnae[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Cnae[];
}
