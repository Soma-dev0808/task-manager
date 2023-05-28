import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TaskBoard } from "./TaskBoard";
import { TaskColumn } from "./TaskColumn";

// TODO: Add assigned user
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { nullable: true, length: 255 })
  content: string;

  @Column("smallint", { nullable: true })
  estimate: number;

  @Column("smallint", { nullable: true })
  order: number;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.tasks)
  @JoinColumn({ name: "column_id" })
  task_column: TaskColumn;

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.tasks)
  task_board: TaskBoard;
}
