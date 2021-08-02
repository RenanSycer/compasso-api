import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCostumerDto } from './dto/update-customer.dto';
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

  async findCustomerByName(teste: string): Promise<Customer[]> {
    const customer = await this.customerRepository.findByName(teste);
    return customer;
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCostumerDto,
  ): Promise<Customer> {
    const updated = await this.customerRepository.updateCustomer(
      id,
      updateCustomerDto,
    );

    return updated;
  }

  async deleteCustomer(id: string) {
    return await this.customerRepository.deleteCustomer(id);
  }
}
