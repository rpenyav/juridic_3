// src/testsuites/dto/create-testsuite.dto.ts
import { IsString, IsEmail, IsNumber, IsInt, IsBoolean } from 'class-validator';

export class CreateClientsDto {
  @IsString()
  entityType: string;

  @IsString()
  documentType: string;

  @IsString()
  documentNumber: string;

  @IsString()
  clientName: string;

  @IsString()
  clientSurname: string;

  @IsString()
  clientGender: string;

  @IsString()
  clientBirthdate: string;

  @IsString()
  clientBirthplace: string;

  @IsString()
  clientEmail: string;

  @IsString()
  clientNationality: string;

  @IsBoolean()
  isAbonat: boolean;

  @IsBoolean()
  isDataTreatment: boolean;

  @IsBoolean()
  haveDocToGet: boolean;

  @IsBoolean()
  scannedDocument: boolean;

  @IsString()
  clientFather: string;

  @IsString()
  clientMother: string;

  @IsString()
  clientCell: string;

  @IsString()
  clientTelephone: string;

  @IsString()
  clientFax: string;

  @IsString()
  clientObservations: string;

  @IsString()
  clientAccountName: string;

  @IsString()
  clientOwner: string;

  @IsString()
  clientDcIban: string;

  @IsString()
  clientBankEntity: string;

  @IsString()
  clientBankBranch: string;

  @IsString()
  clientDcBank: string;

  @IsString()
  clientAccountNumber: string;

  @IsString()
  clientBank: string;

  @IsBoolean()
  clientIsFirstHome: boolean;

  @IsString()
  clientCarrer: string;

  @IsString()
  clientCp: string;

  @IsString()
  clientProvince: string;

  @IsString()
  clientCity: string;
}
