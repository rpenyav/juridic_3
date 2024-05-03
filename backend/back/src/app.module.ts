import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Expedientes } from './entities/expedientes.entity';
import { ExpedientesController } from './expedientes/expedientes.controller';
import { ExpedientesService } from './expedientes/expedientes.service';
import { Clients } from './entities/clients.entity';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'qaei887.rafapenya.com',
      port: 3306,
      username: 'qaei887',
      password: 'JRK441e22',
      database: 'qaei887',
      entities: [Expedientes, Clients],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Expedientes, Clients]),
  ],
  controllers: [ExpedientesController, ClientsController],
  providers: [ExpedientesService, ClientsService],
})
export class AppModule {}
