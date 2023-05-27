import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { TaskGroup } from "./TaskGroup";
import { TaskBoard } from "./TaskBoard";

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn()
  column_id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.columns)
  task_board: TaskBoard;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.task_column)
  task_groups: TaskGroup[];
}
