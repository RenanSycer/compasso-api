import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { CityModule } from './modules/city/city.module';

@Module({
  imports: [CustomerModule, CityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
