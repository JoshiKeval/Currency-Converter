import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";

@Entity()
export class countryCodes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({nullable:true})
  country: string;

  @Column({nullable:true})
  currency_code: string;
}
