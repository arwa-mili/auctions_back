import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { GatewayServiceAppModule } from './services/gateway/service-app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(GatewayServiceAppModule);
    const config = app.get(ConfigService);
    const port = Number(process.env.PORT || config.get<number>('PORT') || 3000);

    app.setGlobalPrefix('api');

    const docConfig = new DocumentBuilder()
    .setTitle('Auctions API Gateway')
    .setDescription('Aggregated API documentation for Auctions microservices')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, docConfig, { ignoreGlobalPrefix: false });
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(port);
    Logger.log(`Gateway (HTTP) listening on http://0.0.0.0:${port}`);
    Logger.log(`Swagger available at http://0.0.0.0:${port}/api/docs`);
}
bootstrap();
