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

  @Get() async findFilter(@Query('value') value: string): Promise<Customer[]> {
    const cities = await this.customerService.findCustomerByName(value);
    return cities;
  }

  /*  @Patch(':id')
  update} */
}
