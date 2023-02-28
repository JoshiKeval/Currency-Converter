import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddUserTable {

@PrimaryGeneratedColumn()
user_id:string;  

@Column()
name:string;

@Column({unique:true})
email:string;

@Column()
password:string;

}
 