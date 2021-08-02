import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ReturnCityDto } from './dto/return-city.dto';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiCreatedResponse({
    description:
      'Returns an array of cities based on a name query param given.',
  })
  async findByName(@Query('name') name: string): Promise<City[]> {
    const cities = await this.cityService.findByCityName(name);
    return cities;
  }

  @Get('state')
  @ApiCreatedResponse({
    description:
      'Returns an array of cities based on a state query param given.',
  })
  async findByState(@Query('state') state: string): Promise<City[]> {
    const cities = await this.cityService.findByCityState(state);
    return cities;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a City.',
  })
  @ApiBody({ type: CreateCityDto })
  async create(
    @Body(ValidationPipe) createCityDto: CreateCityDto,
  ): Promise<ReturnCityDto> {
    const city = await this.cityService.createCity(createCityDto);
    return {
      city,
      message: 'The city has been created',
    };
  }
}
