import { SubscriptionProcedures } from "./subscription-prodedures";

export interface SubscriptionPhase {
  [key: string]: any;
  id?: number;
  valid?: boolean;
  userModId?: string;
  dateMod?: string;
  position:number,
  condition:string,
  valueYes:string,
  valueNo:string,
  subscriptionProcedure: SubscriptionProcedures,
  subscriptionParentProcedure: SubscriptionProcedures
  
}

export interface PaginatedResponse {
  allData: SubscriptionPhase[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: SubscriptionPhase[];
}
