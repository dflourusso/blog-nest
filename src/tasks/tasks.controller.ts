import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultLogger } from 'src/Default.logger';
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from 'src/tasks/task.dto';

const MAX_RECORDS_PER_AGE = 5;

@Controller('tasks')
export class TasksController {
  constructor(
    private prisma: PrismaService,
    private defaultLogger: DefaultLogger,
  ) { }

  @Get()
  findAll(@Query() query: Prisma.TaskFindManyArgs) {
    this.defaultLogger.logRequest('TasksController', 'findAll', query);
    return this.prisma.task.findMany({
      skip: Number(query.skip ?? 0),
      take: Number(
        Math.min(query.take ?? MAX_RECORDS_PER_AGE, MAX_RECORDS_PER_AGE),
      ),
    });
  }

  @Post()
  create(@Body() body: TaskDto) {
    this.defaultLogger.logRequest('TasksController', 'create', body);
    return this.prisma.task.create({ data: body });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.defaultLogger.logRequest('TasksController', 'findOne', { id });
    return this.prisma.task.findFirstOrThrow({
      where: {
        id: +id,
      },
    });
    // .catch((e) => {
    //   throw new NotFoundException(e);
    // });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: TaskDto) {
    this.defaultLogger.logRequest('TasksController', 'update', { id, ...data });
    return this.prisma.task.update({
      where: {
        id: +id,
      },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    this.defaultLogger.logRequest('TasksController', 'delete', { id });
    await this.prisma.task.delete({
      where: {
        id: +id,
      },
    });
  }
}
