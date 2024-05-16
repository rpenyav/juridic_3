export interface Municipalities {
    [key: string]: any;
    id?: number;
    valid?: boolean;
    userModId?: string;
    dateMod?: string;
    code: string;
   
   
  }
  
  export interface PaginatedResponse {
    allData: Municipalities[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    list: Municipalities[];
  }