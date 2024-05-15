export interface VisitTypes {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  literalNameText: string;

}

export interface PaginatedResponse {
  allData: VisitTypes[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: VisitTypes[];
}
