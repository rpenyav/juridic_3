export interface Comarcs {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  name: string;
}

export interface PaginatedResponse {
  allData: Comarcs[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Comarcs[];
}
