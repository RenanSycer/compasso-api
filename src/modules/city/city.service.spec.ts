import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { CustomerRepository } from '../customer/repositories/customer.repository';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityRepository } from './repositories/city.repository';

const mockCityRepository = () => ({
  storeCity: jest.fn(),
  findByName: jest.fn(),
  findByState: jest.fn(),
});

const mockCustomerRepository = () => ({});

describe('CityService', () => {
  let cityRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
      providers: [
        CityService,
        {
          provide: CityRepository,
          useFactory: mockCityRepository,
        },
      ],
    }).compile();

    cityRepository = await module.get<CityRepository>(CityRepository);
    service = await module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  // testing city.repository storeCity
  describe('storeCity', () => {
    let mockCreateCityDto: CreateCityDto;

    beforeEach(() => {
      mockCreateCityDto = {
        name: 'Mock City',
        state: 'Mock State',
      };
    });

    it('should create an city', async () => {
      cityRepository.storeCity.mockResolvedValue('mockCity');
      const result = await service.createCity(mockCreateCityDto);

      expect(cityRepository.storeCity).toHaveBeenCalledWith(mockCreateCityDto);

      expect(result).toEqual('mockCity');
    });

    it('should an error when a city with same name exists', async () => {
      cityRepository.storeCity.mockResolvedValue('mockCity');

      try {
        await service.createCity(mockCreateCityDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  // testing city.repository findByName
  describe('findByName', () => {
    it('should return cities object found by the given name', async () => {
      const cityName = 'City';
      const citiesExpected = [];
      cityRepository.findByName.mockReturnValue(citiesExpected);

      const result = await service.findByCityName(cityName);

      expect(result).toEqual(citiesExpected);
    });

    it('should return an error when no cities are found', async () => {
      const cityName = 'City';
      cityRepository.findByName.mockReturnValue(undefined);

      try {
        await service.findByCityName(cityName);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`No cities found with that name`);
      }
    });
  });

  // testing city.repository findByState
  describe('findByState', () => {
    it('should return cities object found by the given state', async () => {
      const cityState = 'State';
      const citiesExpected = [];
      cityRepository.findByState.mockReturnValue(citiesExpected);

      const result = await service.findByCityState(cityState);

      expect(result).toEqual(citiesExpected);
    });

    it('should return an error when no cities are found', async () => {
      const cityState = 'City';
      cityRepository.findByState.mockReturnValue(undefined);

      try {
        await service.findByCityState(cityState);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`No cities found with that name`);
      }
    });
  });
});
