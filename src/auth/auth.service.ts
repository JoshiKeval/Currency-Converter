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
      const checkEmail = await this.AddUserRepo.findOne({ where: { email } });
      if (checkEmail) {
        throw new ConflictException("User already exist");
      }
      await this.AddUserRepo.save(AddData);
      let res = new AddUserResDto("Register SucssesFully...");
      return res;
    } catch (error) {}
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
      if (areEqual == true) {
        const { user_id } = checkUser;
        const token = this.generateToken({ user_id });
        let msg = new LoginResDto("Login Succesfully...", token);
        return msg;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "Wrong Password",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }
}
