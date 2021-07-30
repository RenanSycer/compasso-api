import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCityDto } from '../dto/create-city.dto';
import { City } from '../entities/city.entity';

@EntityRepository(City)
export class CityRepository extends Repository<City> {
  async storeCity(createCityDto: CreateCityDto): Promise<City> {
    const { name, state } = createCityDto;

    const previousCreatedCity = await this.findOne({
      where: { name: name, state: state },
    });

    //Se existir uma city com os mesmos dados, não será inserida.
    if (previousCreatedCity) {
      throw new ConflictException(
        `The city ${name} wich is in the state ${state}, has already been created`,
      );
    }

    const city = this.create();
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

  async findByName(city: string): Promise<City[]> {
    const result = await this.find({
      where: { name: city },
    });

    if (!result) {
      throw new NotFoundException(`No cities found with that name`);
    }

    return result;
  }

  async findByState(cityState: string): Promise<City[]> {
    const result = await this.find({
      where: { state: cityState },
    });

    if (!result) {
      throw new NotFoundException(`No cities found with that state`);
    }

    return result;
  }
}
