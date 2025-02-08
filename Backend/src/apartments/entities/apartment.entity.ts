import { Expose } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apartments')
export class Apartment {
  @Expose()
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Index()
  @Expose()
    name: string;

  @Column()
  @Index()
  @Expose()
    project: string;

  @Column('int')
  @Expose()
    number: number;

    @Column('decimal', { precision: 10, scale: 2 })
  @Expose()
    price: number;
}
