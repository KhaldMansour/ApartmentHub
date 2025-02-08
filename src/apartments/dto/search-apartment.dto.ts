import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchApartmentDto {
  @ApiProperty({
    description: 'The name of the apartment',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
    name?: string;

  @ApiProperty({
    description: 'The project the apartment is part of',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
    project?: string;

  @ApiProperty({
    description: 'The apartment number',
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
    number?: number;

  @ApiProperty({
    description: 'The price of the apartment',
    type: Number,
    required: false
  })
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
    price?: number;

  @ApiProperty({
    description: 'The page number for pagination',
    type: Number,
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseFloat(value))
    page?: number = 1;

  @ApiProperty({
    description: 'The number of results per page for pagination',
    type: Number,
    example: 10,
    required: false
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseFloat(value))
    take?: number = 10;
}
