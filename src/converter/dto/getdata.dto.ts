import { ApiProperty } from "@nestjs/swagger";

export class GetDataDto{
  @ApiProperty({name:"from",description:"From Country",type:"string",required:true})
  from:string;

  @ApiProperty({name:"want",description:"Want Country",type:"string",required:true})
  want:string;

  @ApiProperty({name:"amount",description:"Enter Amount",type:"number",required:true})
  amount:number;
}