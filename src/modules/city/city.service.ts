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

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async createCity(createCityDto: CreateCityDto): Promise<City> {
    const { name, state } = createCityDto;

    const previousCreatedCity = await this.cityRepository.findOne({
      where: { name: name, state: state },
    });

    //Se existir uma city com os mesmos dados, não será inserida.
    if (previousCreatedCity) {
      throw new ConflictException(
        `The city ${name} wich is in the state ${state}, has already been created`,
      );
    }

    const city = this.cityRepository.create();
    city.name = name;
    city.state = state;

    try {
      await city.save();
      return city;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during the city save process',
        error,
      );
    }
  }

  async findByCityName(city: string): Promise<City[]> {
    const result = await this.cityRepository.find({
      where: { name: city },
    });

    if (!result) {
      throw new NotFoundException(`No cities found with that name`);
    }

    return result;
  }

  async findByCityState(cityState: string): Promise<City[]> {
    const result = await this.cityRepository.find({
      where: { state: cityState },
    });

    if (!result) {
      throw new NotFoundException(`No cities found with that state`);
    }

    return result;
  }
}
