import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './repositories/city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CityRepository])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
