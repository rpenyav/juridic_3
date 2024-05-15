export interface EconomicProcedureType {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: EconomicProcedureType[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: EconomicProcedureType[];
}
