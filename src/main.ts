import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { API_PREFIX } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Trust proxy headers (X-Forwarded-For, X-Real-IP) for accurate
  // client IP resolution behind Docker, Nginx, or load balancers.
  // Essential for audit trail IP tracking.
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  const frontendPort = 5175;

  // Global prefix with exclusion for standard Prometheus scraping endpoint
  app.setGlobalPrefix(API_PREFIX, {
    exclude: ['metrics'],
  });
  
  app.use(cookieParser());

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter(configService));

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger Configuration: Only mount in dev or when explicitly requested
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('PayrollPro API')
      .setDescription('The internal HR and Payroll Management API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);
  }

  // Enable CORS
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  app.enableCors({
    // Replace with specific production frontend origin once deployed
    origin: isProduction 
      ? [process.env.FRONTEND_URL || 'https://votre-domaine.com'] 
      : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

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
