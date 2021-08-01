import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { City } from 'src/modules/city/entities/city.entity';
import { CityRepository } from 'src/modules/city/repositories/city.repository';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCustomerDto } from '../dto/create-customer.dto';
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

  async findByName(name: string): Promise<Customer[]> {
    console.log(name);
    const customer = await this.find({
      where: { name: name },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  /* private async preloadCity(name: string, state: string): Promise<City> {
    const cityRepository = this.manager.getCustomRepository(CityRepository);
    const existingCity = await cityRepository.findOne({
      where: { name: name, state: state },
    });

    if (existingCity) {
      return existingCity;
    }

    const newCIty = await cityRepository.create({ name, state });

    return newCIty;
  } */
}
