import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerRepository } from './repositories/customer.repository';

const mockCustomerRepository = () => ({
  storeCustomer: jest.fn(),
  findById: jest.fn(),
  findByName: jest.fn(),
  updateCustomer: jest.fn(),
  deleteCustomer: jest.fn(),
});

describe('CustomerService', () => {
  let customerRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: CustomerRepository, useFactory: mockCustomerRepository },
      ],
    }).compile();

    customerRepository = await module.get<CustomerRepository>(
      CustomerRepository,
    );
    service = await module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // #1 testing customer.repository storeCustomer
  describe('storeCustomer', () => {
    let mockCreateCustomerDto: CreateCustomerDto;

    beforeEach(() => {
      mockCreateCustomerDto = {
        name: 'Mock Name',
        surname: 'Mock Surname',
        gender: 'Male',
        birthdate: '19/08/1996',
        city: 'Mock City',
      };
    });

    it('should create an customer', async () => {
      customerRepository.storeCustomer.mockResolvedValue('Mock Customer');
      const result = await service.createCustomer(mockCreateCustomerDto);

      expect(customerRepository.storeCustomer).toHaveBeenCalledWith(
        mockCreateCustomerDto,
      );

      expect(result).toEqual('Mock Customer');
    });
  });

  // #2 testing customer.repository findById
  describe('findById', () => {
    it('should return an customer by a given id', async () => {
      customerRepository.findById.mockResolvedValue('mockCustomer');
      expect(customerRepository.findById).not.toHaveBeenCalled();

      const result = await service.findCustomerById('mockId');

      expect(customerRepository.findById).toHaveBeenCalledWith('mockId');

      expect(result).toEqual('mockCustomer');
    });

    it('should throw an error customer is not found', async () => {
      const customerId = 1;
      customerRepository.findById.mockResolvedValue(null);
      try {
        await service.findCustomerById(customerId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findByName', () => {
    it('should return customer array found by the given name', async () => {
      const customerName = 'Mock Customer';
      const customersExpected = [];
      customerRepository.findByName.mockReturnValue(customersExpected);

      const result = await service.findCustomerByName(customerName);

      expect(customerRepository.findByName).toHaveBeenCalledWith(customerName);

      expect(result).toEqual(customersExpected);
    });

    it('should return an error when customers are not found', async () => {
      const customerName = 'Mock Name';
      customerRepository.findByName.mockReturnValue(undefined);

      try {
        await service.findCustomerByName(customerName);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateCustomer', () => {
    it('should be update a customer and return', async () => {
      const customerId = '1';
      const customerData = {};
      const customerExpected = {};

      customerRepository.findById.mockResolvedValue(customerId);
      customerRepository.updateCustomer.mockReturnValue(customerExpected);

      const customer = await service.findCustomerById('mockId');
      const updatedCustomer = await service.updateCustomer(
        customer,
        customerData,
      );
      expect(updatedCustomer).toEqual(customerExpected);
    });
  });

  describe('deleteCustomer', () => {
    it('should found an customer to persist delete operation', async () => {
      customerRepository.deleteCustomer.mockResolvedValue('mockId');

      const result = await service.deleteCustomer('mockId');
      expect(customerRepository.deleteCustomer).toHaveBeenCalledWith('mockId');
      expect(result).toEqual('mockId');
    });
  });
});
