import { NestFactory } from '@nestjs/core';
import { SearchServiceAppModule } from './service-app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SearchServiceAppModule);
  const config = app.get(ConfigService);
  const port = Number(process.env.PORT || config.get<number>('PORT') || 3000);

  const swaggerCfg = new DocumentBuilder().setTitle('Search Service').setVersion('1.0').addTag('search').build();
  const doc = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(port);
  Logger.log(`Search service listening on http://0.0.0.0:${port}`);
  Logger.log(`Search docs: http://0.0.0.0:${port}/docs`);
}
bootstrap();