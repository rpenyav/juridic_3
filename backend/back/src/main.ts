import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma automáticamente las solicitudes en instancias de DTO
      whitelist: true, // Elimina campos desconocidos del DTO
      forbidNonWhitelisted: true, // Rechaza solicitudes con campos desconocidos
      validationError: { target: false }, // Retorna solo errores de validación, no sobre el objeto completo
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5000', // Ajusta según el puerto de tu frontend si es necesario
  });

  await app.listen(3000);
}
bootstrap();
