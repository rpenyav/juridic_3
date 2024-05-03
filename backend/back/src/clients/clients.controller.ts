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
import { CreateClientsDto } from './create-clients.dto';
import { ClientsService } from './clients.service';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { Clients } from 'src/entities/clients.entity';
import { UpdateClientsDto } from './edit-clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private testSuiteService: ClientsService) {}

  @Post('add')
  createClients(@Body() createClientsDto: CreateClientsDto) {
    return this.testSuiteService.createClients(createClientsDto);
  }

  @Get('get')
  getAllClientss(
    @Query('orderBy') orderBy: string, // Nueva query param para ordenar
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC', // Nueva query param para dirección de ordenamiento
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('pageNumber', ParseIntPipe) pageNumber: number = 1,
  ): Promise<PaginatedResponse<Clients>> {
    return this.testSuiteService.getAllClientss(
      pageNumber,
      pageSize,
      orderBy,
      orderDirection,
    );
  }

  @Get('search')
  searchClientss(
    @Query('documentNumber') documentNumber?: string,
    @Query('clientName') clientName?: string,
    @Query('clientSurname') clientSurname?: string,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<Clients>> {
    return this.testSuiteService.searchClientss(
      { documentNumber, clientName, clientSurname },
      pageNumber,
      pageSize,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  getClientsById(@Param('id', ParseIntPipe) id: number): Promise<Clients> {
    return this.testSuiteService.getClientsById(id);
  }

  @Get('document/:documentNumber')
  async getClientByDocumentNumber(
    @Param('documentNumber') documentNumber: string,
  ): Promise<Clients> {
    return this.testSuiteService.getClientByDocumentNumber(documentNumber);
  }

  // @Put('edit/:id')
  // async updateClients(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateClientsDto: UpdateClientsDto,
  // ): Promise<Clients> {
  //   return this.testSuiteService.updateClients(id, updateClientsDto);
  // }
}
