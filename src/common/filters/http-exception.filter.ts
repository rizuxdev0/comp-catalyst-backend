import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Une erreur interne est survenue';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      message = typeof res === 'object' && res.message ? res.message : exception.message;
      error = typeof res === 'object' && res.error ? res.error : 'HTTP Exception';
    } else if (exception instanceof QueryFailedError) {
      // TypeORM/Postgres database exceptions
      status = HttpStatus.BAD_REQUEST;
      error = 'Database Constraint Error';
      const driverError = exception.driverError || {};
      const code = driverError.code;

      this.logger.error(`Database Exception: ${exception.message} (Code: ${code})`);

      // Format user friendly messages based on PostgreSQL error codes
      switch (code) {
        case '23505': // Unique violation
          message = 'Cette donnée existe déjà dans notre système (doublon détecté).';
          break;
        case '23503': // Foreign key violation
          message = 'Opération impossible car cette donnée est liée à un autre élément existant.';
          break;
        case '23502': // Not null violation
          message = 'Un champ requis est manquant ou incomplet.';
          break;
        default:
          message = isProduction 
            ? 'Erreur lors du traitement de la requête en base de données.' 
            : exception.message;
          break;
      }
    } else if (exception instanceof Error) {
      this.logger.error(`Unhandled Exception: ${exception.message}`, exception.stack);
      message = isProduction ? 'Une erreur imprévue est survenue.' : exception.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
