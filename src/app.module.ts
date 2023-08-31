import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DefaultLogger } from 'src/Default.logger';
import { LoggerMiddleware } from 'src/logger.middleware';
import { PrismaService } from 'src/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [PrismaService, AppService, DefaultLogger],
  exports: [DefaultLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tasks');
  }
}
