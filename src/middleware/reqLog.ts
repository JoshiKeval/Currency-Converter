import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

@Injectable()
export class ReqLogMid implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req)
  const req_url=req.url
   const baseURL=`http://localhost:3000${req_url}`
   console.log(baseURL);
    next();
  }
}
