import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DefaultLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    console.log('My custom log', {
      message,
      stack,
      context,
    });
    super.error(message, stack, context);
  }

  logRequest(
    controller: string,
    method: string,
    data: any,
    stack?: string,
    context?: string,
  ) {
    // add your tailored logic here
    const message = `${controller}->${method}: ${JSON.stringify(data)}`;
    super.log(message, stack, context);
  }
}
