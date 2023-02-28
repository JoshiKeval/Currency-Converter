import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import axios from "axios";

import { GetDataDto } from "src/db/dto/request/getdata.dto";
import { CurrencyDto } from "src/db/dto/response/currency.res.dto";
import { readFileSync } from "fs";
import { DataSource } from "typeorm";
import { countryCodes } from "src/db/entity/countryCode.entity";
@Injectable()
export class ConverterService {
  constructor(@Inject("DATA_SOURCE") private dataSource: DataSource) {}

  async getData(getDataDto: GetDataDto) {
    const { from, want, amount } = getDataDto;
    const url =
      "https://api.api-ninjas.com/v1/convertcurrency?have=" +
      from +
      "&want=" +
      want +
      "&amount=" +
      amount;

    try {
      const a = await axios({
        method: "GET",
        url,
      });
      const { new_amount, new_currency, old_currency, old_amount } = a.data;
      const data: CurrencyDto = new CurrencyDto(
        old_currency,
        new_currency,
        old_amount,
        new_amount
      );
      return data;
    } catch (error) {
      throw new HttpException('Please Enter Valid Country Code',HttpStatus.BAD_REQUEST)
    }
  }
  async getCountry(){
    return await this.dataSource.getRepository(countryCodes).find()
  }

  // async insertJson() {
  //   let jsonf = readFileSync("D:/Nest Js/currency-converter/src/data.json");
  //   let obj = JSON.parse(jsonf.toString())
  //  return await this.dataSource.manager.insert(countryCodes,obj)

  // }
}
