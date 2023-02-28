import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConverterController } from './converter.controller';
import { HttpModule } from '@nestjs/axios/dist';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule,HttpModule],
  providers: [ConverterService],
  controllers: [ConverterController]
})
export class ConverterModule {}
