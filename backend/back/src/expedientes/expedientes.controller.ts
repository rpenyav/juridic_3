import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateExpedientesDto } from './create-expedientes.dto';
import { ExpedientesService } from './expedientes.service';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { Expedientes } from 'src/entities/expedientes.entity';
import { UpdateExpedientesDto } from './edit-expedientes.dto';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private testSuiteService: ExpedientesService) {}

  @Post('add')
  createExpedientes(@Body() createExpedientesDto: CreateExpedientesDto) {
    return this.testSuiteService.createExpedientes(createExpedientesDto);
  }

  @Get('get')
  getAllExpedientess(
    @Query('orderBy') orderBy: string, // Nueva query param para ordenar
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Nueva query param para dirección de ordenamiento
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('pageNumber', ParseIntPipe) pageNumber: number = 1,
  ): Promise<PaginatedResponse<Expedientes>> {
    return this.testSuiteService.getAllExpedientess(
      pageNumber,
      pageSize,
      orderBy,
      orderDirection,
    );
  }

  @Get('search')
  searchExpedientess(
    @Query('referencia') referencia?: string,
    @Query('numexpedient') numexpedient?: string,
    @Query('client') client?: string,
    @Query('contrari') contrari?: string,
    @Query('tutor') tutor?: string,
    @Query('numautos') numautos?: string,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<Expedientes>> {
    return this.testSuiteService.searchExpedientess(
      { referencia, numexpedient, client, contrari, tutor, numautos },
      pageNumber,
      pageSize,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  getExpedientesById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Expedientes> {
    return this.testSuiteService.getExpedientesById(id);
  }

  // @Put('edit/:id')
  // async updateExpedientes(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateExpedientesDto: UpdateExpedientesDto,
  // ): Promise<Expedientes> {
  //   return this.testSuiteService.updateExpedientes(id, updateExpedientesDto);
  // }
}
