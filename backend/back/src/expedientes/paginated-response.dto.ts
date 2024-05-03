import { Expedientes } from 'src/entities/expedientes.entity';

export class PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  list: T[];
}
