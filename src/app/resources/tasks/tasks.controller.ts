import { TasksService } from './tasks.service';
import { TasksModel } from './model/tasks.model';
import {
  TaskDto,
  GetTasksFilterDto,
  UpdateTaskStatusDto,
} from './dto/task.dto';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Delete,
  HttpCode,
  Controller,
} from '@nestjs/common';

@Controller()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('tasks')
  @HttpCode(200)
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    if (Object.keys(filterDto)) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getTasks();
    }
  }

  @Get('task/:id')
  @HttpCode(200)
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @Post('task')
  @HttpCode(200)
  createTask(@Body() taskDto: TaskDto) {
    return this.taskService.createTask(taskDto);
  }

  @Patch('task/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): TasksModel {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTask(id, status);
  }

  @Delete('task/:id')
  @HttpCode(200)
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
