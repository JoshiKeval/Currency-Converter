import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto{
@IsEmail()
@ApiProperty({name:"email",description:"Enter Login Email",type:"string",required:true})
email:string;

@IsNotEmpty()
@ApiProperty({name:"password",description:"Enter Login Password",type:"string",required:true})
password:string
}