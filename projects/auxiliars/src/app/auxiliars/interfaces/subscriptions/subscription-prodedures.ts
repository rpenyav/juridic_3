export interface SubscriptionProcedures{
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string,
  literalDescriptionCode: string,
  literalDescriptionText:  string,
  duration: number,
  calendar: any

}

export interface PaginatedResponse {
  allData: SubscriptionProcedures[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionProcedures[];
}
