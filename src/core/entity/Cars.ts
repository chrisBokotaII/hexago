import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Cars {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  name!: string;
  @Column()
  brand!: string;
  @Column()
  color!: string;
  @ManyToOne(() => User, (user) => user.cars, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
