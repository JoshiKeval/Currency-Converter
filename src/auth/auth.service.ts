import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AddUserDto } from "src/db/dto/request/adduser.dto";
import { LoginDto } from "src/db/dto/request/loginUser.dto";
import { AddUserTable } from "src/db/entity/addUser.entity";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AddUserResDto } from "src/db/dto/response/addUser.res.dto";
import { LoginResDto } from "src/db/dto/response/login.res.dto";
import { BadRequestException } from "@nestjs/common";
import { ForbiddenException } from "@nestjs/common";

@Injectable()
export class AuthService {
  private AddUserRepo: Repository<AddUserTable>;
  constructor(
    @Inject("DATA_SOURCE")
    private datasource: DataSource,
    private jwtService: JwtService
  ) {
    this.AddUserRepo = this.datasource.getRepository(AddUserTable);
  }
  /////////////////////////////////////////////////////////////////////////Token Generater
  generateToken(payload: object): string {
    return this.jwtService.sign(payload);
  }

  ////////////////////////////////////////////////////////////////////////// Register
  async addUser(adduser: AddUserDto) {
    const { name, email, password } = adduser;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const AddData = this.AddUserRepo.create({
      name,
      email,
      password: hashPass,
    });

    try {
      await this.AddUserRepo.save(AddData);
      let res = new AddUserResDto("Register SucssesFully...");
      return res;
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException("User already exists");
      else throw new BadRequestException(error.message);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////Login

  async loginUser(userLog: LoginDto) {
    const { email, password } = userLog;
    const checkUser = await this.AddUserRepo.findOne({ where: { email } });
    if (!checkUser) {
      throw new HttpException("User Not Found", HttpStatus.FORBIDDEN);
    }
    const areEqual = await bcrypt.compare(password, checkUser.password);
    try {
      if (areEqual) {
        const { user_id } = checkUser;
        const token = this.generateToken({ user_id });
        let msg = new LoginResDto("Login Succesfully...", token);
        return msg;
      }else{
        throw new ForbiddenException("Wrong Password...")
      }
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }
}
