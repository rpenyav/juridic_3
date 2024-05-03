import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expedientes } from 'src/entities/expedientes.entity';
import { CreateExpedientesDto } from './create-expedientes.dto';
import { PaginatedResponse } from './paginated-response.dto'; // Importamos el nuevo DTO
import { UpdateExpedientesDto } from './edit-expedientes.dto';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expedientes)
    private testSuiteRepository: Repository<Expedientes>,
  ) {}

  async createExpedientes(
    createExpedientesDto: CreateExpedientesDto,
  ): Promise<Expedientes> {
    const newExpedientes =
      this.testSuiteRepository.create(createExpedientesDto);
    await this.testSuiteRepository.save(newExpedientes);
    return newExpedientes;
  }

  async getAllExpedientess(
    pageNumber: number,
    pageSize: number,
    orderBy?: string, // Hacer el parámetro opcional
    orderDirection?: 'ASC' | 'DESC', // Hacer el parámetro opcional
  ): Promise<PaginatedResponse<Expedientes>> {
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

  async searchExpedientess(
    filters: {
      referencia?: string;
      numexpedient?: string;
      client?: string;
      contrari?: string;
      tutor?: string;
      numautos?: string;
    },
    pageNumber: number,
    pageSize: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Expedientes>> {
    const skip = (pageNumber - 1) * pageSize;
    let query = this.testSuiteRepository.createQueryBuilder('testSuite');

    // Agregar condiciones de búsqueda
    let conditions = [];
    if (filters.referencia) {
      conditions.push(`testSuite.referencia LIKE :referencia`);
    }
    if (filters.numexpedient) {
      conditions.push(`testSuite.numexpedient LIKE :numexpedient`);
    }

    if (filters.client) {
      conditions.push(`testSuite.client LIKE :client`);
    }
    if (filters.contrari) {
      conditions.push(`testSuite.contrari LIKE :contrari`);
    }
    if (filters.tutor) {
      conditions.push(`testSuite.tutor LIKE :tutor`);
    }
    if (filters.numautos) {
      conditions.push(`testSuite.numautos LIKE :numautos`);
    }

    // Combinar todas las condiciones con 'OR'
    if (conditions.length > 0) {
      query = query.where(conditions.join(' OR '), {
        referencia: `%${filters.referencia}%`,
        numexpedient: `%${filters.numexpedient}%`,
        client: `%${filters.client}%`,
        contrari: `%${filters.contrari}%`,
        tutor: `%${filters.tutor}%`,
        numautos: `%${filters.numautos}%`,
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

  async getExpedientesById(id: number): Promise<Expedientes> {
    const testSuite = await this.testSuiteRepository.findOne({
      where: { id: id },
    });

    if (!testSuite) {
      throw new NotFoundException(`Expedientes with ID ${id} not found`);
    }
    return testSuite;
  }

  // async updateExpedientes(
  //   id: number,
  //   updateExpedientesDto: UpdateExpedientesDto,
  // ): Promise<Expedientes> {
  //   if (updateExpedientesDto.projectId) {
  //     updateExpedientesDto.projectId = parseInt(
  //       updateExpedientesDto.projectId.toString(),
  //       10,
  //     );
  //   }

  //   const testSuite = await this.testSuiteRepository.findOne({
  //     where: { id: id },
  //   });

  //   if (!testSuite) {
  //     throw new NotFoundException(`Expedientes with ID ${id} not found`);
  //   }

  //   Object.assign(testSuite, updateExpedientesDto);

  //   await this.testSuiteRepository.save(testSuite);

  //   return testSuite;
  // }
}
