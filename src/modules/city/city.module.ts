import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityRepository } from './repositories/city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CityRepository])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
