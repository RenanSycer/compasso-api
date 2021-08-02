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
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReturnCustomerDto } from './dto/return-customer.dto';
import { UpdateCostumerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entitiy';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create a Customer.',
  })
  @ApiBody({ type: CreateCustomerDto })
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

  @ApiCreatedResponse({
    description: 'Return a single Customer by a id param.',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReturnCustomerDto> {
    const customer = await this.customerService.findCustomerById(+id);
    return {
      customer,
      message: 'Usuário encontrado',
    };
  }

  @ApiCreatedResponse({
    description: 'Return an array of Customers by a name query param.',
  })
  @Get()
  async findFilter(@Query('name') name: string): Promise<Customer[]> {
    const cities = await this.customerService.findCustomerByName(name);
    return cities;
  }

  @ApiCreatedResponse({
    description:
      'Updates a Customer based an optionals payload fields and a id param.',
  })
  @ApiBody({ type: UpdateCostumerDto })
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

  @ApiCreatedResponse({
    description: 'Delete a Customer based on a id param.',
  })
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    await this.customerService.deleteCustomer(id);
    return { message: 'Customer has been deleted' };
  }
}
