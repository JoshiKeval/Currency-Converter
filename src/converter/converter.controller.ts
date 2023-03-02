import { Controller, UseGuards } from "@nestjs/common";
import { Body, Get, Param, Post } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
// import { GetDataDto } from "src/db/dto/request/getdata.dto";
// import { CurrencyDto } from "src/db/dto/response/currency.res.dto";
import { GetDataDto } from "src/db/dto/request/getdata.dto";
import { CurrencyDto } from "src/db/dto/response/currency.res.dto";
import { ConverterService } from "./converter.service";

@ApiTags("Converter")
@Controller("converter")
export class ConverterController {
  constructor(private converterService: ConverterService) {}

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  getData(@Body() getDataDto: GetDataDto): Promise<CurrencyDto> {
    return this.converterService.getData(getDataDto);
  }

  @Get("/getCountryCode")
  @UseGuards(AuthGuard("jwt"))
  async getCountry() {
    let result = await this.converterService.getCountry();
    return result;
  }

  // @Get('i')
  // async inserD(){
  //   return await this.converterService.insertJson()
  // }
}
