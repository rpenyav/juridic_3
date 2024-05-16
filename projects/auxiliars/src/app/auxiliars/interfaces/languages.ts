export interface Languages {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  literalDescriptionText: string;
  active: boolean

}

export interface PaginatedResponse {
  allData: Languages[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Languages[];
}
