export interface Province {
  [key: string]: any;
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: string;
  code: string;
  name: string;
  autonomousRegion: AutonomousRegion;
  country: Country;
}

export interface AutonomousRegion {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: string;
  code: string;
  name: string;
}

export interface Country {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: string;
  code: string;
  literalNameText: string | null;
}

export interface PaginatedResponse {
  allData: Province[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: Province[];
}
