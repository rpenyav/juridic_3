import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from 'src/entities/clients.entity';
import { CreateClientsDto } from './create-clients.dto';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { UpdateClientsDto } from './edit-clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private testSuiteRepository: Repository<Clients>,
  ) {}

  async createClients(createClientsDto: CreateClientsDto): Promise<Clients> {
    const newClients = this.testSuiteRepository.create(createClientsDto);
    await this.testSuiteRepository.save(newClients);
    return newClients;
  }

  async getAllClientss(
    pageNumber: number,
    pageSize: number,
    orderBy?: string, // Hacer el parámetro opcional
    orderDirection?: 'ASC' | 'DESC', // Hacer el parámetro opcional
  ): Promise<PaginatedResponse<Clients>> {
    const skip = (pageNumber - 1) * pageSize;
    let query = this.testSuiteRepository
      .createQueryBuilder('testSuite')
      .skip(skip >= 0 ? skip : 0)
      .take(pageSize > 0 ? pageSize : 10);

    if (orderBy && orderDirection) {
      // Verificar si los parámetros están presentes
      query = query.orderBy(`testSuite.${orderBy}`, orderDirection); // Aplicar ordenamiento si están presentes
    }

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / pageSize);
    const isLast = pageNumber === totalPages;

    return {
      list,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalElements,
      totalPages,
      isLast,
    };
  }

  async searchClientss(
    filters: {
      documentNumber?: string;
      clientName?: string;
      clientSurname?: string;
    },
    pageNumber: number,
    pageSize: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Clients>> {
    const skip = (pageNumber - 1) * pageSize;
    let query = this.testSuiteRepository.createQueryBuilder('testSuite');

    let conditions = [];
    if (filters.documentNumber) {
      conditions.push(`testSuite.documentNumber LIKE :documentNumber`);
    }
    if (filters.clientName) {
      conditions.push(`testSuite.clientName LIKE :clientName`);
    }

    if (filters.clientSurname) {
      conditions.push(`testSuite.clientSurname LIKE :clientSurname`);
    }

    if (conditions.length > 0) {
      query = query.where(conditions.join(' OR '), {
        documentNumber: `%${filters.documentNumber}%`,
        clientName: `%${filters.clientName}%`,
        clientSurname: `%${filters.clientSurname}%`,
      });
    }

    if (orderBy && orderDirection) {
      query = query.orderBy(`testSuite.${orderBy}`, orderDirection);
    }

    query = query.skip(skip).take(pageSize);

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / pageSize);
    return {
      list,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalElements,
      totalPages,
      isLast: pageNumber === totalPages,
    };
  }

  async getClientByDocumentNumber(documentNumber: string): Promise<Clients> {
    const client = await this.testSuiteRepository.findOne({
      where: { documentNumber: documentNumber },
    });

    if (!client) {
      throw new NotFoundException(
        `Client with document number ${documentNumber} not found`,
      );
    }

    return client;
  }

  async getClientsById(id: number): Promise<Clients> {
    const testSuite = await this.testSuiteRepository.findOne({
      where: { id: id },
    });

    if (!testSuite) {
      throw new NotFoundException(`Clients with ID ${id} not found`);
    }
    return testSuite;
  }

  // async updateClients(
  //   id: number,
  //   updateClientsDto: UpdateClientsDto,
  // ): Promise<Clients> {
  //   if (updateClientsDto.projectId) {
  //     updateClientsDto.projectId = parseInt(
  //       updateClientsDto.projectId.toString(),
  //       10,
  //     );
  //   }

  //   const testSuite = await this.testSuiteRepository.findOne({
  //     where: { id: id },
  //   });

  //   if (!testSuite) {
  //     throw new NotFoundException(`Clients with ID ${id} not found`);
  //   }

  //   Object.assign(testSuite, updateClientsDto);

  //   await this.testSuiteRepository.save(testSuite);

  //   return testSuite;
  // }
}
