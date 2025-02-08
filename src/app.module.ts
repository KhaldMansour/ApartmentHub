import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ApartmentsModule } from './apartments/apartments.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ApartmentsModule
  ],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor
  }]
})
export class AppModule {}
