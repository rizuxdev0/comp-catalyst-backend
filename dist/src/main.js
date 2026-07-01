"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const constants_1 = require("./common/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('APP_PORT') || 3000;
    const frontendPort = 5175;
    app.setGlobalPrefix(constants_1.API_PREFIX);
    app.use(cookieParser());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(configService));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    if (configService.get('NODE_ENV') !== 'production') {
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle('PayrollPro API')
            .setDescription('The internal HR and Payroll Management API')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup(`${constants_1.API_PREFIX}/docs`, app, document);
    }
    const isProduction = configService.get('NODE_ENV') === 'production';
    app.enableCors({
        origin: isProduction
            ? [process.env.FRONTEND_URL || 'https://votre-domaine.com']
            : true,
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
//# sourceMappingURL=main.js.map