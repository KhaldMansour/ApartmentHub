import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { UpdateApartmentDto } from '../dto/update-apartment.dto';
import { Apartment } from '../entities/apartment.entity';
import { SearchApartmentDto } from '../dto/search-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>
  ) {}

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    const createdApartment = this.apartmentRepository.create(createApartmentDto);
    const apartment = await this.apartmentRepository.save(createdApartment);
    return plainToInstance(Apartment, apartment);
  }

  async findAll(query: SearchApartmentDto): Promise<{ apartments: Apartment[], total: number }> {
    const { page , take, ...filters } = query;
    
    const skip = (page - 1) * take;

    const queryBuilder = this.apartmentRepository.createQueryBuilder('apartment');

    Object.keys(filters).forEach((key) => {
      queryBuilder.andWhere(`apartment.${key} = :${key}`, { [`${key}`]: filters[key] });
    });

    queryBuilder.skip(skip).take(take);

    const data = await queryBuilder.getMany();

    const plainData = plainToInstance(Apartment, data, {
      excludeExtraneousValues: true 
    });

    const total = await queryBuilder.getCount();

    return { apartments: plainData, total };
  }

  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id }
    });

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    return plainToInstance(Apartment, apartment);
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOne({
      where: { id }
    });

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    Object.assign(apartment, updateApartmentDto);

    return plainToInstance(Apartment, await this.apartmentRepository.save(apartment));
  }
}
