import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksModel } from './model/tasks.model';
import { TasksStatusEnum } from './enum/tasks-status.enum';
import { GetTasksFilterDto, TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: TasksModel[] = [];

  getTasks(): TasksModel[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): TasksModel[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  getTask(id: string): TasksModel {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`No data with the id ${id} found`);
    } else {
      return found;
    }
  }

  createTask(taskDto: TaskDto): TasksModel {
    const { title, description } = taskDto;
    const task: TasksModel = {
      id: uuid(),
      title,
      description,
      status: TasksStatusEnum.IN_PROGRESS,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, newStatus: TasksStatusEnum) {
    const task = this.getTask(id);
    task.status = newStatus;
    return task;
  }

  deleteTask(id: string): void {
    const tasks = this.tasks;
    const foundId = tasks.findIndex((task) => task.id == id);
    tasks.splice(foundId, 1);
  }
}
