import { Module } from '@nestjs/common';
import { TasksModule } from './app/resources/tasks/tasks.module';
import { TasksService } from './app/resources/tasks/tasks.service';

@Module({
  controllers: [],
  imports: [TasksModule],
  providers: [TasksService],
})
export class AppModule {}
