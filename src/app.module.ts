import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RegLogInterceptor } from './Interceptor/reqLog.interceptor';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DbModule,AuthModule,ConverterModule],
  providers:[  {
    provide: APP_INTERCEPTOR,
    useClass: RegLogInterceptor,
  },]
})
export class AppModule{}

