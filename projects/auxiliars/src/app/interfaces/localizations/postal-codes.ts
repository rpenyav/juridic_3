import { Province } from "../provinces";

export interface PostalCodes {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  code: string;
  name: string;
  province: Province;
  populationCentre: string | null;
 
}

export interface PaginatedResponse {
  allData: PostalCodes[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: PostalCodes[];
}
