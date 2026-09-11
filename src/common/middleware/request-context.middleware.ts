import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { requestContextStorage, RequestContext } from '../request-context';

/**
 * Middleware that extracts the client IP address and user agent from each
 * incoming HTTP request and stores them in AsyncLocalStorage.
 *
 * This makes the IP accessible from any service (e.g., AuditService)
 * without explicitly passing it through every controller → service call.
 *
 * IP extraction priority:
 * 1. X-Forwarded-For header (first IP in the chain — original client)
 * 2. X-Real-IP header (common with Nginx reverse proxy)
 * 3. req.ip (Express fallback, may be loopback behind proxy)
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];

    let ipAddress: string | null = null;

    if (typeof forwarded === 'string') {
      // X-Forwarded-For may contain multiple IPs: "client, proxy1, proxy2"
      ipAddress = forwarded.split(',')[0].trim();
    } else if (typeof realIp === 'string') {
      ipAddress = realIp.trim();
    } else {
      ipAddress = req.ip || null;
    }

    const context: RequestContext = {
      ipAddress,
      userAgent: req.headers['user-agent'] || null,
    };

    requestContextStorage.run(context, () => {
      next();
    });
  }
}
