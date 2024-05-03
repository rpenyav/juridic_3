// src/testsuites/dto/create-testsuite.dto.ts
import { IsString, IsEmail, IsNumber, IsInt, IsBoolean } from 'class-validator';

export class CreateExpedientesDto {
  @IsString() referencia: string;

  @IsString() numexpedient: string;

  @IsString() client: string;

  @IsString() contrari: string;

  @IsString() tutor: string;

  @IsString() estat: string;

  @IsInt()
  numautos: number;

  @IsString()
  dataexpedicio: string;

  @IsString()
  dataestat: string;

  @IsBoolean()
  destruit: boolean;

  @IsBoolean()
  digitalitzat: boolean;

  @IsString() ubicacio: string;

  @IsString()
  tipusexpedient: string;

  @IsString()
  despatxexpedient: string;

  @IsString()
  grupexpedient: string;
}
