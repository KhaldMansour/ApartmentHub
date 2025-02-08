import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('APP_NAME') ?? 'ApartmentHub')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
