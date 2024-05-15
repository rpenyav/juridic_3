export interface SubscriptionType {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: SubscriptionType[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionType[];
}
