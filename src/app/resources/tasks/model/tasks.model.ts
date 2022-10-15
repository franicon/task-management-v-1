import { TasksStatusEnum } from '../enum/tasks-status.enum';

export class TasksModel {
  id: string;
  title: string;
  description: string;
  status: TasksStatusEnum;
}
