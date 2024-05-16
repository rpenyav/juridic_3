export interface SubscriptionTag {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: SubscriptionTag[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionTag[];
}
