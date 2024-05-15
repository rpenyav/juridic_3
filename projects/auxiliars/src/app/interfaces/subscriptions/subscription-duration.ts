export interface SubscriptionDuration {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
  month: number;
}

export interface PaginatedResponse {
  allData: SubscriptionDuration[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionDuration[];
}
