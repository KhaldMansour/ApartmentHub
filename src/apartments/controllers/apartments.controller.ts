import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';

import { ApartmentsService } from '../services/apartments.service';
import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { UpdateApartmentDto } from '../dto/update-apartment.dto';
import { Apartment } from '../entities/apartment.entity';
import { SearchApartmentDto } from '../dto/search-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  async create(@Body() createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    return await this.apartmentsService.create(createApartmentDto); 
  }

  @Get()
  async findAll(@Query() query: SearchApartmentDto): Promise<{ apartments: Apartment[], total: number }> {
    return await this.apartmentsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Apartment> {
    return await this.apartmentsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto): Promise<Apartment> {
    return await this.apartmentsService.update(+id, updateApartmentDto);
  }
}
