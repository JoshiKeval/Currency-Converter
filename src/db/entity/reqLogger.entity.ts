import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ReqLoggerTable {
  
  @PrimaryGeneratedColumn("increment")
  req_id: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  userid: string;

  @CreateDateColumn()
  created_at: Date;
}
