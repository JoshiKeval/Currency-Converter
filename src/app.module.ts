import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ReqLogMid } from './middleware/reqLog';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DbModule,AuthModule,ConverterModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ReqLogMid).forRoutes('/');
  }
}
