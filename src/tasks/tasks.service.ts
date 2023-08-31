import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryDto } from 'src/tasks/query.dto';
import { TaskDto } from 'src/tasks/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  fetchAll(payload: QueryDto) {
    return this.prisma.task.findMany({
      skip: payload.skip,
      take: payload.take,
      where: { title: payload.title },
      orderBy: { id: 'desc' },
    });
  }

  create(payload: TaskDto) {
    return this.prisma.task.create({ data: payload });
  }

  findOne(id: number) {
    return this.prisma.task.findFirstOrThrow({ where: { id } });
  }

  update(id: number, payload: TaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number) {
    await this.prisma.task.delete({ where: { id } });
  }
}
