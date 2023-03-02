import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { AddUserTable } from "./addUser.entity";

@Entity()
export class ReqLoggerTable {
  @PrimaryColumn()
  @PrimaryGeneratedColumn("increment")
  req_id: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  method: string;

  @ManyToOne(()=>AddUserTable,(use)=>use.user_id)
  @JoinColumn({name:"requser_id"},)
  userid: number;

  @CreateDateColumn()
  created_at: Date;
}
