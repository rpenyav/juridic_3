export interface Offices {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string,
  analiticalCode: number,
  name: string,
  initials: string,
  notifyVisitsGroup: boolean,
  fileId: number

}

export interface PaginatedResponse {
  allData: Offices[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Offices[];
}
