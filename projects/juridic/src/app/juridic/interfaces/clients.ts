export interface ClientModel {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  type: string;
  personTypeId: number;
  name: string;
  surname: string;
  documentTypeId: number;
  documentNumber: string;
  conflictive: boolean;
  conflictDescription: string;
  observations: string;
  nationalityId: number;
  languageId: number;
  paymentMethodId: number;
  relationCrId: number;
  addresses: any[];
  emails: any[];
  phones: any[];
  bankAccounts: any[];
  constitutionDate: Date;
  administrationSystem: string;
  patronalNumber: number;
  numberOfWorkers: number;
  latePayment: boolean;
  latePaymentDescription: string;
  subscriberAntiquity: Date;
  accountingAccount: number;
  activity: string;
  cnae: number;
  centers: any[];
  contactPersons: any[];
  cooperativesRegisterNumber: string;
  genderId: number;
}

export interface ClientState {
  client: ClientModel | null;
}

export const initialClientState: ClientState = {
  client: null,
};
