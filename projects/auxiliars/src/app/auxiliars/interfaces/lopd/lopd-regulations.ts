export interface LopdRegulations {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string;
  effectDate: Date;
}

export interface PaginatedResponse {
  allData: LopdRegulations[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: LopdRegulations[];
}
