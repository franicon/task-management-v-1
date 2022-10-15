import { TasksStatusEnum } from '../enum/tasks-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class GetTasksFilterDto {
  @IsOptional()
  status?: TasksStatusEnum;

  @IsOptional()
  search?: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TasksStatusEnum)
  @IsNotEmpty()
  status: TasksStatusEnum;
}
