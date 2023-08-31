import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DefaultLogger } from 'src/Default.logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(DefaultLogger));
  await app.listen(3000);
}
bootstrap();
