import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';
import { CityRepository } from './repositories/city.repository';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
  ) {}

  async createCity(createCityDto: CreateCityDto): Promise<City> {
    const city = await this.cityRepository.storeCity(createCityDto);

    return city;
  }

  async findByCityName(city: string): Promise<City[]> {
    const result = await this.cityRepository.findByName(city);

    return result;
  }

  async findByCityState(cityState: string): Promise<City[]> {
    const result = await this.cityRepository.findByState(cityState);

    return result;
  }
}
