import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestLogger } from 'src/request.logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private requestLogger: RequestLogger) { }
  use(req: Request, res: Response, next: NextFunction) {
    this.requestLogger.logRequest(req);

    next();
  }
}
