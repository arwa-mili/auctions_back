import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { BiddingModule } from './bidding.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    RabbitMQModule,
    BiddingModule
  ],
  controllers: [],
  providers: []
})
export class BiddingServiceAppModule {}
