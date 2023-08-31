import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/logger.middleware';
import { PrismaService } from 'src/prisma.service';
import { RequestLogger } from 'src/request.logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [],
  controllers: [AppController, TasksController],
  providers: [PrismaService, AppService, RequestLogger, TasksService],
  exports: [RequestLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tasks');
  }
}
