import { IsString, IsNumber, IsPositive, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApartmentDto {
    @ApiProperty({
      description: 'The name of the apartment',
      type: String,
      example: 'Luxury Apartment',
      required: false
    })
    @IsString()
    @IsOptional()
      name?: string;

    @ApiProperty({
      description: 'The project the apartment is part of',
      type: String,
      example: 'Sunset Towers',
      required: false
    })
    @IsString()
    @IsOptional()
      project?: string;

    @ApiProperty({
      description: 'The apartment number',
      type: Number,
      example: 101,
      required: false
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
      number?: number;

    @ApiProperty({
      description: 'The price of the apartment',
      type: Number,
      example: 250000,
      required: false
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
      price?: number;
}
