export interface PurposeProfiles {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  name: string;
  profile: any;
  communicationPurpose: any;
}

export interface PaginatedResponse {
  allData: PurposeProfiles[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: PurposeProfiles[];
}
