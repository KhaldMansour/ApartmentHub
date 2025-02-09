import { promisify } from 'util';
import { exec } from 'child_process';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';

const execPromise = promisify(exec);

import { ApartmentsModule } from './apartments/apartments.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ApartmentSeederService } from './apartments/services/apartment-seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ApartmentsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }]
})
export class AppModule {
  constructor(private readonly apartmentSeederService: ApartmentSeederService) {}

  async onModuleInit(): Promise<void> {
    try {
      console.log('Running migrations...');
      await execPromise('npm run migrate');
      console.log('Migrations completed!');
    } catch (error) {
      console.error('Error running migrations:', error);
    }
    await this.apartmentSeederService.seedApartments();
  }
}
 