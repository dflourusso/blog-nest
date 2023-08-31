import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RequestLogger } from 'src/request.logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(RequestLogger));
  await app.listen(3000);
}
bootstrap();
