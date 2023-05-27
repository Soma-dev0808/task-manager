import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { User } from "./User";
import { TaskBoard } from "./TaskBoard";

@Entity()
export class UserBoard {
  @PrimaryGeneratedColumn()
  user_board_id: number;

  @ManyToOne(() => User, (user) => user.user_boards)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.user_boards)
  @JoinColumn({ name: "board_id" })
  task_board: TaskBoard;
}
