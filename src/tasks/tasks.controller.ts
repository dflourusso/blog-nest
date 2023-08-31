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
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Controller('tasks')
export class TasksController {
  constructor(private prisma: PrismaService) { }

  @Get()
  findAll() {
    return this.prisma.task.findMany();
  }

  @Post()
  create(@Body() body: Prisma.TaskCreateInput) {
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
  update(@Param('id') id: string, @Body() data: Prisma.TaskUpdateInput) {
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
