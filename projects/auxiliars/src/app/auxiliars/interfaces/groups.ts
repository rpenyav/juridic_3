export interface Groups {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: number;
  codeSap: string;
  name: string;
  responsibleId: number;
  emailVisits: string;
  emailLink: string;
  extension: string;
}

export interface PaginatedResponse {
  allData: Groups[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Groups[];
}
