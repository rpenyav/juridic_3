export interface Purpose {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  name: string;
  lopd: boolean;
  subscription: boolean;
  folder: boolean;
  invoicing: boolean;
  visit: boolean;
}

export interface PaginatedResponse {
  allData: Purpose[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Purpose[];
}
