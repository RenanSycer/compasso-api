import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from '../city/repositories/city.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entitiy';
import { CustomerRepository } from './repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.storeCustomer(
      createCustomerDto,
    );

    return customer;
  }

  async findCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    return customer;
  }

  async findCustomerByName(name: string): Promise<Customer[]> {
    console.log(name);
    const customer = await this.customerRepository.findByName(name);
    return customer;
  }
}
