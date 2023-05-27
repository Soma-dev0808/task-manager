import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Task } from "./Task";
import { TaskColumn } from "./TaskColumn";

@Entity()
export class TaskGroup {
  @PrimaryGeneratedColumn()
  task_group_id: number;

  @ManyToOne(() => Task, (task) => task.task_groups)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.task_groups)
  @JoinColumn({ name: "column_id" })
  task_column: TaskColumn;
}
