import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { SearchModule } from './search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL')
      }),
      inject: [ConfigService]
    }),
    RabbitMQModule,
    SearchModule
  ],
  controllers: [],
  providers: []
})
export class SearchServiceAppModule {}
