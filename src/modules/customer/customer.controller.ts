import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReturnCustomerDto } from './dto/return-customer.dto';
import { UpdateCostumerDto } from './dto/update-customer.dto';
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

  @Get() async findFilter(@Query('value') value: string): Promise<Customer[]> {
    const cities = await this.customerService.findCustomerByName(value);
    return cities;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCostumerDto,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerService.updateCustomer(
      id,
      updateCustomerDto,
    );
    return updatedCustomer;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    await this.customerService.deleteCustomer(id);
    return { message: 'Customer has been deleted' };
  }
}
