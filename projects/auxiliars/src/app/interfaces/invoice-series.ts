export interface InvoiceSeries {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  literalDescriptionCode: string;
  literalDescriptionText: string;
  priority: number;
  startDate: Date;
  endDate: Date;
  rectification: boolean;
  imputation: boolean;
  nifNotValid: boolean;

}

export interface PaginatedResponse {
  allData: InvoiceSeries[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: InvoiceSeries[];
}
