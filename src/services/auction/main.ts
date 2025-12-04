import { NestFactory } from '@nestjs/core';
import { AuctionServiceAppModule } from './service-app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuctionServiceAppModule);
  const config = app.get(ConfigService);
  const port = Number(process.env.PORT || config.get<number>('PORT') || 3000);

  // Swagger for this service
  const swaggerCfg = new DocumentBuilder().setTitle('Auction Service').setVersion('1.0').addTag('auctions').build();
  const doc = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(port);
  Logger.log(`Auction service listening on http://0.0.0.0:${port}`);
  Logger.log(`Auction docs: http://0.0.0.0:${port}/docs`);
}
bootstrap();