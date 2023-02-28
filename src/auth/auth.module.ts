import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DbModule } from "src/db/db.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt/dist";
import { JwtStrategy } from "./jwtStrategy";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    PassportModule,
    JwtModule.register({
      secret: String(process.env.JWTKEY),
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
