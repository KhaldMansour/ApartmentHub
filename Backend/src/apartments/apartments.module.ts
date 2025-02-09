import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentsController } from './controllers/apartments.controller';
import { ApartmentsService } from './services/apartments.service';
import { Apartment } from './entities/apartment.entity';
import { ApartmentSeederService } from './services/apartment-seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, ApartmentSeederService],
  exports: [ApartmentSeederService]
})
export class ApartmentsModule {}
