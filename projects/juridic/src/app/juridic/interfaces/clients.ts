export interface ClientModel {
  id: number;
  entityType: string;
  documentType: string;
  documentNumber: string;
  clientName: string;
  clientSurname: string;
  clientGender: string;
  clientBirthdate: Date;
  clientBirthplace: string;
  clientEmail: string;
  clientNationality: string;
  isAbonat: boolean;
  isDataTreatment: boolean;
  haveDocToGet: boolean;
  scannedDocument: boolean;
  clientFather: string;
  clientMother: string;
  clientCell: string;
  clientTelephone: string;
  clientFax: string;
  clientObservations: string;
  clientAccountName: string;
  clientOwner: string;
  clientDcIban: string;
  clientBankEntity: string;
  clientBankBranch: string;
  clientDcBank: string;
  clientAccountNumber: string;
  clientBank: string;
  clientIsFirstHome: boolean;
  clientCarrer: string;
  clientCp: string;
  clientProvince: string;
  clientCity: string;
}

export interface ClientState {
  client: ClientModel | null;
}

export const initialClientState: ClientState = {
  client: null,
};
