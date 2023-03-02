import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsEmail, ValidateIf } from "class-validator";

export class AddUserDto {
  @IsNotEmpty()
  @ApiProperty({name:"name",description:"User Name",type:"string",required:true})
  name: string;

  @IsEmail()
  @ApiProperty({name:"email",description:"User Email",type:"string",required:true})
  email: string;

  @IsNotEmpty()
  @ApiProperty({name:"password",description:"User Password",type:"string",required:true})
  password: string;
}
