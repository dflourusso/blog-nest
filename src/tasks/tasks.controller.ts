import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RequestLogger } from 'src/request.logger';
import { QueryDto } from 'src/tasks/query.dto';
import { TaskDto } from 'src/tasks/task.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private prisma: PrismaService,
    private defaultLogger: RequestLogger,
    private tasksService: TasksService,
  ) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: QueryDto) {
    return this.tasksService.fetchAll(query);
  }

  @Post()
  create(@Body() body: TaskDto) {
    return this.tasksService.create(body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: TaskDto) {
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
