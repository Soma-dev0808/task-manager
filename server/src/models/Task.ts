import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TaskGroup } from "./TaskGroup";
import { TaskBoard } from "./TaskBoard";

// TODO: Add assigned user
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { nullable: true, length: 255 })
  content: string;

  @Column("int", { nullable: true })
  estimate: number;

  @Column()
  order: number;

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.tasks)
  task_board: TaskBoard;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.task)
  task_groups: TaskGroup[];
}
