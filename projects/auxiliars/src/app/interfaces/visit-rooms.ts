export interface VisitRooms {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  name: string;
  capacity: number;
  deskId: number;
}

export interface PaginatedResponse {
  allData: VisitRooms[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: VisitRooms[];
}
