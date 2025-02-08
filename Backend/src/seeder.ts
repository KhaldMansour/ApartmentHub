import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ApartmentSeederService } from './apartments/services/apartment-seeder';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  const apartmentSeederService = app.get(ApartmentSeederService);
  
  await apartmentSeederService.seedApartments();
  console.log('Seeding complete!');
  
  await app.close();
}

bootstrap();
