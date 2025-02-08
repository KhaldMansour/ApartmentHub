import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
    @ApiProperty({
      description: 'The name of the apartment',
      type: String,
      example: 'Luxury Apartment'
    })
    @IsString()
      name: string;

    @ApiProperty({
      description: 'The project the apartment is part of',
      type: String,
      example: 'Sunset Towers'
    })
    @IsString()
      project: string;

    @ApiProperty({
      description: 'The apartment number',
      type: Number,
      example: 101
    })
    @IsInt()
    @IsPositive()
      number: number;

    @ApiProperty({
      description: 'The price of the apartment',
      type: Number,
      example: 250000
    })
    @IsNumber()
    @IsPositive()
      price: number;
}
