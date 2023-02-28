import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ReqLoggerTable } from "src/db/entity/reqLogger.entity";
import { DataSource } from "typeorm";

@Injectable()
export class RegLogInterceptor implements NestInterceptor {
  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {}
 async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const data = ctx.getRequest();
    let url = `http://localhost:3000${data.url}`;
    let body = data.body;
    let method = data.method;
    let userid = data.user?.user_id;
    const reqlogdata=await this.dataSource.getRepository(ReqLoggerTable).create({
      url, body, method,userid 
    })
    await this.dataSource.getRepository(ReqLoggerTable).save(reqlogdata);
    return next.handle();
  }
}
