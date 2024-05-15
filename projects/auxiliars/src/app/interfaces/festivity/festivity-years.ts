export interface FestivityYears {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  year: number;
}

export interface PaginatedResponse {
  allData: FestivityYears[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: FestivityYears[];
}
