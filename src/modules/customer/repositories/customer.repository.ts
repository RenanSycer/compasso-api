import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCostumerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entitiy';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async storeCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { name, surname, gender, birthdate, city } = createCustomerDto;

    const customer = this.create();
    customer.name = name;
    customer.surname = surname;
    customer.gender = gender;
    customer.birthdate = birthdate;
    customer.city = city;

    try {
      await customer.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during the create customer save process',
        error,
      );
    }
    return customer;
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async findByName(customerName: string): Promise<Customer[]> {
    const customer = await this.find({
      where: { name: customerName },
    });

    if (!customer || customer.length < 1) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCostumerDto,
  ): Promise<Customer> {
    const customer = await this.findById(+id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const { name, surname, gender, birthdate, city } = updateCustomerDto;
    customer.name = name ? name : customer.name;
    customer.surname = surname ? surname : customer.surname;
    customer.gender = gender ? gender : customer.gender;
    customer.birthdate = birthdate ? birthdate : customer.birthdate;
    customer.city = city ? city : customer.city;

    try {
      await customer.save();
    } catch (error) {
      throw new InternalServerErrorException('Error during the update process');
    }

    return customer;
  }

  async deleteCustomer(id: string) {
    const customer = await this.findById(+id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.delete(id);
  }
}
