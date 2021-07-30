import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ReturnCityDto } from './dto/return-city.dto';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findByName(@Query('name') name: string): Promise<City[]> {
    const cities = await this.cityService.findByCityName(name);
    return cities;
  }

  @Get('state')
  async findByState(@Query('state') state: string): Promise<City[]> {
    const cities = await this.cityService.findByCityState(state);
    return cities;
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<ReturnCityDto> {
    const city = await this.cityService.createCity(createCityDto);
    return {
      city,
      message: 'The city has been created',
    };
  }
}
