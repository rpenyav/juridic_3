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

export class UpdateExpedientesDto {
  @IsOptional()
  @IsString()
  referencia: string;

  @IsOptional()
  @IsString()
  numexpedient: string;

  @IsOptional()
  @IsString()
  client: string;

  @IsOptional()
  @IsString()
  contrari: string;

  @IsOptional()
  @IsString()
  tutor: string;

  @IsOptional()
  @IsString()
  estat: string;

  @IsOptional()
  @IsInt()
  numautos: number;

  @IsOptional()
  @IsString()
  dataexpedicio: string;

  @IsOptional()
  @IsString()
  dataestat: string;

  @IsOptional()
  @IsBoolean()
  destruit: boolean;

  @IsOptional()
  @IsBoolean()
  digitalitzat: boolean;

  @IsOptional()
  @IsString()
  ubicacio: string;

  @IsOptional()
  @IsString()
  tipusexpedient: string;

  @IsOptional()
  @IsString()
  despatxexpedient: string;

  @IsOptional()
  @IsString()
  grupexpedient: string;
}
