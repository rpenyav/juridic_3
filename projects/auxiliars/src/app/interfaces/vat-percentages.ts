export interface VatPercentages {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  literalDescriptionText: string,
  percentage: number

}

export interface PaginatedResponse {
  allData: VatPercentages[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: VatPercentages[];
}
