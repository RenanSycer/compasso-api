import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ValidatePromise } from 'class-validator';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReturnCustomerDto } from './dto/return-customer.dto';
import { Customer } from './entities/customer.entitiy';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCustomerDto: CreateCustomerDto,
  ): Promise<ReturnCustomerDto> {
    const customer = await this.customerService.createCustomer(
      createCustomerDto,
    );
    return {
      customer,
      message: 'The customer has been created',
    };
  }

  @Get(':id')
  async findById(@Param('id') id): Promise<ReturnCustomerDto> {
    const customer = await this.customerService.findCustomerById(id);
    return {
      customer,
      message: 'Usuário encontrado',
    };
  }

  @Get('name')
  async findByName(
    @Query('nameCustomer') nameCustomer: string,
  ): Promise<Customer[]> {
    console.log(nameCustomer);
    const customer = await this.customerService.findCustomerByName(
      nameCustomer,
    );
    return customer;
  }

  /*  @Patch(':id')
  update} */
}
