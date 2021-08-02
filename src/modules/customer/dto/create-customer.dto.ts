import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({
    message: 'A city name must be a string',
  })
  @IsNotEmpty({
    message: 'A city name must be set',
  })
  @ApiProperty()
  readonly name: string;

  @IsString({
    message: 'A surname state must be a string',
  })
  @IsNotEmpty({
    message: 'A surname state must be set',
  })
  @ApiProperty()
  readonly surname: string;

  @IsString({
    message: 'A gender state must be a string',
  })
  @IsNotEmpty({
    message: 'A gender must be set',
  })
  @ApiProperty()
  readonly gender: string;

  @IsString({ message: 'Set a valid date' })
  @IsNotEmpty({
    message: 'A date must be set',
  })
  @ApiProperty()
  readonly birthdate: string;

  @IsString({
    message: 'A city name must be a string',
  })
  @IsNotEmpty({
    message: 'A city name must be set',
  })
  @ApiProperty()
  readonly city: string;
}
