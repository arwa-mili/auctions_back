import { NestFactory } from '@nestjs/core';
import { BiddingServiceAppModule } from './service-app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(BiddingServiceAppModule);
  const config = app.get(ConfigService);
  const port = Number(process.env.PORT || config.get<number>('PORT') || 3000);

  const swaggerCfg = new DocumentBuilder().setTitle('Bidding Service').setVersion('1.0').addTag('bids').build();
  const doc = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(port);
  Logger.log(`Bidding service listening on http://0.0.0.0:${port}`);
  Logger.log(`Bidding docs: http://0.0.0.0:${port}/docs`);
}
bootstrap();
