// src/testsuites/dto/update-testsuite.dto.ts
import {
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClientsDto {
  @IsOptional()
  @IsString()
  entityType: string;
  @IsOptional()
  @IsString()
  documentType: string;
  @IsOptional()
  @IsString()
  documentNumber: string;
  @IsOptional()
  @IsString()
  clientName: string;

  @IsOptional()
  @IsString()
  clientSurname: string;

  @IsOptional()
  @IsString()
  clientGender: string;
  @IsOptional()
  @IsString()
  clientBirthdate: string;
  @IsOptional()
  @IsString()
  clientBirthplace: string;
  @IsOptional()
  @IsString()
  clientEmail: string;
  @IsOptional()
  @IsString()
  clientNationality: string;
  @IsOptional()
  @IsBoolean()
  isAbonat: boolean;
  @IsOptional()
  @IsBoolean()
  isDataTreatment: boolean;
  @IsOptional()
  @IsBoolean()
  haveDocToGet: boolean;
  @IsOptional()
  @IsBoolean()
  scannedDocument: boolean;
  @IsOptional()
  @IsString()
  clientFather: string;
  @IsOptional()
  @IsString()
  clientMother: string;
  @IsOptional()
  @IsString()
  clientCell: string;
  @IsOptional()
  @IsString()
  clientTelephone: string;
  @IsOptional()
  @IsString()
  clientFax: string;
  @IsOptional()
  @IsString()
  clientObservations: string;
  @IsOptional()
  @IsString()
  clientAccountName: string;
  @IsOptional()
  @IsString()
  clientOwner: string;
  @IsOptional()
  @IsString()
  clientDcIban: string;
  @IsOptional()
  @IsString()
  clientBankEntity: string;
  @IsOptional()
  @IsString()
  clientBankBranch: string;
  @IsOptional()
  @IsString()
  clientDcBank: string;
  @IsOptional()
  @IsString()
  clientAccountNumber: string;
  @IsOptional()
  @IsString()
  clientBank: string;
  @IsOptional()
  @IsBoolean()
  clientIsFirstHome: boolean;
  @IsOptional()
  @IsString()
  clientCarrer: string;
  @IsOptional()
  @IsString()
  clientCp: string;
  @IsOptional()
  @IsString()
  clientProvince: string;
  @IsOptional()
  @IsString()
  clientCity: string;
}
