import { DataSource } from "typeorm";
import { AddUserTable } from "./entity/addUser.entity";
import { countryCodes } from "./entity/countryCode.entity";
import { ReqLoggerTable } from "./entity/reqLogger.entity";

export const databaseProvider = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        username: String(process.env.DB_USERNAME),
        password:String(process.env.DB_PASS),
        database: String(process.env.DB_NAME),
        entities: [AddUserTable,countryCodes,ReqLoggerTable],
        synchronize: true,
        logging: true,
      });
      return await dataSource.initialize();
    },
  },
];
