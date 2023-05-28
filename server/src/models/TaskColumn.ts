import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TaskBoard } from "./TaskBoard";
import { Task } from "./Task";

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn()
  column_id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("smallint", { nullable: true })
  order: number;

  @OneToMany(() => Task, (task) => task.task_column)
  tasks: Task[];

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.columns)
  task_board: TaskBoard;
}
