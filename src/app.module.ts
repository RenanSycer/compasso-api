import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { CityModule } from './modules/city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: configService.get('database.entities'),
        synchronize: configService.get('database.synchronize'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CityModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
