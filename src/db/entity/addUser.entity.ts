import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";
import { ReqLoggerTable } from "./reqLogger.entity";

@Entity()
export class AddUserTable {
@PrimaryColumn()
@PrimaryGeneratedColumn()
@OneToMany(()=>ReqLoggerTable,(k)=>k.req_id)
user_id:number;  

@Column()
name:string;

@Column({unique:true})
email:string;

@Column()
password:string;

}
 