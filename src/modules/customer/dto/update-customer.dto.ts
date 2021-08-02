import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCostumerDto extends PartialType(CreateCustomerDto) {}
