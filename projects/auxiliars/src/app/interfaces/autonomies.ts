export interface Autonomies {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  name: string;
}

export interface PaginatedResponse {
  allData: Autonomies[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Autonomies[];
}
