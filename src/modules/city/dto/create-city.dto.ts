import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCityDto {
  @IsString({
    message: 'A city name must be a string',
  })
  @IsNotEmpty({
    message: 'A city name must be set',
  })
  @MaxLength(200, {
    message: 'City name is too longer',
  })
  @ApiProperty()
  readonly name: string;

  @IsString({
    message: 'A city state must be a string',
  })
  @IsNotEmpty({
    message: 'A city state must be set',
  })
  @MaxLength(200, {
    message: 'City state is too longer',
  })
  @ApiProperty()
  readonly state: string;
}
