import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { GatewayModule } from './gateway.module';
import { AuctionModule } from '../auction/auction.module';
import { BiddingModule } from '../bidding/bidding.module';
import { IdentityModule } from '../identity/identity.module';
import { SearchModule } from '../search/search.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL')
      }),
      inject: [ConfigService]
    }),
    RabbitMQModule,
    GatewayModule,
    AuctionModule,
    BiddingModule,
    IdentityModule,
    SearchModule
  ],
  controllers: [],
  providers: []
})
export class GatewayServiceAppModule {}
