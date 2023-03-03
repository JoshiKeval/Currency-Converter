import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RegLogInterceptor } from './Interceptor/reqLog.interceptor';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DbModule,AuthModule,ConverterModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  })],
  providers:[  {
    provide: APP_INTERCEPTOR,
    useClass: RegLogInterceptor,
  },]
})
export class AppModule{}

