export interface PayMethods {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  cashPayment: boolean;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: PayMethods[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: PayMethods[];
}
