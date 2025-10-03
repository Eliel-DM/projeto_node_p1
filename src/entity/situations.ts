import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  OneToMany,
} from "typeorm";
import { User } from "./users";

@Entity("situations")
export class Situation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nameSituation!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.situation)
  users!: User[];
}
