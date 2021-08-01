import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCostumerDto extends PartialType(CreateCustomerDto) {}
