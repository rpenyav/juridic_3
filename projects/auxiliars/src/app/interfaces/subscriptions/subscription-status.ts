export interface SubscriptionStatus{
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
  allData: SubscriptionStatus[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionStatus[];
}
