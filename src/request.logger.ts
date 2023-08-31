import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RequestLogger extends ConsoleLogger {
  logRequest(request: Request) {
    const message = `[REQUEST][${request.method}]: ${request.baseUrl} 
     Body: ${JSON.stringify(request.body)}
     Query: ${JSON.stringify(request.query)} `;

    super.log(message);
  }
}
