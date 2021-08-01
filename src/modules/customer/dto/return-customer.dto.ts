import { Customer } from '../entities/customer.entitiy';

export class ReturnCustomerDto {
  customer: Customer;
  message: string;
}
