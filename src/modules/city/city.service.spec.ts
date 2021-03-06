import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityRepository } from './repositories/city.repository';

const mockCityRepository = () => ({
  storeCity: jest.fn(),
  findByName: jest.fn(),
  findByState: jest.fn(),
});

// begin of suit
describe('CityService', () => {
  let cityRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  // #1 testing city.repository storeCity
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

  // #2 testing city.repository findByName
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

  // #3 testing city.repository findByState
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
