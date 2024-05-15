export interface SubscriptionCoverage {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
}

export interface PaginatedResponse {
  allData: SubscriptionCoverage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionCoverage[];
}
