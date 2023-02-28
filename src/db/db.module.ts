import { Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./db.config";

@Global()
@Module({
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DbModule {}
