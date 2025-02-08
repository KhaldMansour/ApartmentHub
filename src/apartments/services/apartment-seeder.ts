import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Apartment } from '../entities/apartment.entity';

@Injectable()
export class ApartmentSeederService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>
  ) {}

  async seedApartments(): Promise<void> {
    const apartments: Apartment[] = [];

    for (let i = 0; i < 100; i++) {
      const apartment = new Apartment();
      apartment.name = faker.commerce.productName();
      apartment.project = faker.company.name();
      apartment.number = faker.number.int({ min: 1, max: 100 });
      apartment.price = faker.number.float({ min: 100, max: 10000 });

      apartments.push(apartment);
    }

    await this.apartmentRepository.save(apartments);
    console.log('100 apartments have been seeded!');
  }
}
