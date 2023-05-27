import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBoard } from "./UserBoard";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column("varchar", { length: 20 })
  user_name: string;

  @Column("varchar", { length: 255 })
  email_address: string;

  @Column("varchar", { length: 255 })
  password: string;

  @OneToMany(() => UserBoard, (userBoard) => userBoard.user)
  user_boards: UserBoard[];
}
