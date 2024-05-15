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
  addresses: Addresses[];
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
  birthDate: string;
}

export interface ClientState {
  client: ClientModel | null;
}

export const initialClientState: ClientState = {
  client: null,
};

export interface Addresses {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  addressType: AddressType;
  foreignAddress: boolean;
  street: string;
  postalCode: PostalCode;
  foreignPostalCode: string;
  foreignMunicipality: string;
  foreignProvince: string;
  foreignCountry: ForeignCountry;
}

export interface AddressType {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  literalDescriptionText?: null;
  name?: string;
}

export interface ForeignCountry {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  literalNameText: null;
}

export interface PostalCode {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  municipality: Municipality;
  populationCentre: null;
}

export interface Municipality {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  name?: string;
  province?: Municipality;
  comarca?: AddressType;
  autonomousRegion?: Municipality;
  country?: Municipality;
  literalNameText?: null;
}

export interface ClientBank {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  titular: string;
  chargeAccount: boolean;
  foreignAccount: boolean;
  bank: BankClient;
  iban: string;
  foreignAccountNumber: string;
}

export interface BankClient {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: number;
  swift: string;
  name: string;
  country: BankCountry;
}

export interface BankCountry {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  literalNameText: null;
}

export interface ClientPhones {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  description: string;
  type: ClientTypePhone;
  number: string;
  principal: boolean;
}

export interface ClientTypePhone {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  literalDescriptionText: null;
  controlLength: boolean;
  length: number;
}

export interface ClientEmails {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  description: string;
  type: ClientTypeEmails;
  number: string;
  principal: boolean;
}

export interface ClientTypeEmails {
  id: number;
  valid: boolean;
  userModId: string;
  dateMod: Date;
  code: string;
  literalDescriptionText: null;
  controlLength: boolean;
  length: number;
}
