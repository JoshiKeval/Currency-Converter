import { IsNotEmpty,IsEmail, ValidateIf } from "class-validator";

export class AddUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
