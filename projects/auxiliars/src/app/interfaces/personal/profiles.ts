export interface Profiles {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  name: string;
  code: string;
  solicitor: boolean;
  company: boolean;
}

export interface PaginatedResponse {
  allData: Profiles[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Profiles[];
}
