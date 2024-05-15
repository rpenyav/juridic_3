export interface MaritalStatus {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText:String
}

export interface PaginatedResponse {
  allData: MaritalStatus[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: MaritalStatus[];
}
