import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { API_PREFIX } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  const frontendPort = 5175;

  // Global prefix
  app.setGlobalPrefix(API_PREFIX);
  
  app.use(cookieParser());

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PayrollPro API')
    .setDescription('The internal HR and Payroll Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);

  const backendUrl = `http://localhost:${port}`;
  const frontendUrl = `http://localhost:${frontendPort}`;
  const swaggerUrl = `${backendUrl}/api/v1/docs`;

  console.log('\n============================================================');
  console.log('  🚀  PayrollPro Backend démarré avec succès !');
  console.log('============================================================');
  console.log(`  📡  Backend API   : ${backendUrl}/api/v1`);
  console.log(`  🌐  Frontend URL  : ${frontendUrl}`);
  console.log(`  📖  Swagger UI    : ${swaggerUrl}`);
  console.log('============================================================\n');
}
bootstrap();
