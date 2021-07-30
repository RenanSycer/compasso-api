import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { CityModule } from './modules/city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CustomerModule, CityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
