import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBoard } from "./UserBoard";
import { TaskColumn } from "./TaskColumn";
import { Task } from "./Task";

@Entity()
export class TaskBoard {
  @PrimaryGeneratedColumn()
  board_id: number;

  @Column()
  board_name: string;

  @OneToMany(() => UserBoard, (userBoard) => userBoard.task_board)
  user_boards: UserBoard[];

  @OneToMany(() => Task, (task) => task.task_board)
  tasks: Task[];

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.task_board)
  columns: TaskColumn[];
}
