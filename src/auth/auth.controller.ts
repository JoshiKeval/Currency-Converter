import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddUserDto } from "src/db/dto/request/adduser.dto";
import { LoginDto } from "src/db/dto/request/loginUser.dto";
import { AddUserResDto } from "src/db/dto/response/addUser.res.dto";
import { LoginResDto } from "src/db/dto/response/login.res.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  AddUser(@Body() addUserDto: AddUserDto): Promise<AddUserResDto> {
    return this.authService.addUser(addUserDto);
  }

  @Post("/login")
  async LoginUser(@Body() loginDto: LoginDto): Promise<LoginResDto> {
    return await this.authService.loginUser(loginDto);
  }
}
