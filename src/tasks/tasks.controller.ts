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
import { PrismaService } from 'src/prisma.service';
import { TaskDto } from 'src/tasks/task.dto';

const MAX_RECORDS_PER_AGE = 5;

@Controller('tasks')
export class TasksController {
  constructor(private prisma: PrismaService) { }

  @Get()
  findAll(@Query() query: Prisma.TaskFindManyArgs) {
    return this.prisma.task.findMany({
      skip: Number(query.skip ?? 0),
      take: Number(
        Math.min(query.take ?? MAX_RECORDS_PER_AGE, MAX_RECORDS_PER_AGE),
      ),
    });
  }

  @Post()
  create(@Body() body: TaskDto) {
    return this.prisma.task.create({ data: body });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.task.findUnique({
      where: {
        id: +id,
      },
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: TaskDto) {
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
    await this.prisma.task.delete({
      where: {
        id: +id,
      },
    });
  }
}
