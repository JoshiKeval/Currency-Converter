import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, MaxLength, Min, min, MinLength } from "class-validator";

export class GetDataDto {

  @ApiProperty({
    name: "from",
    description: "From Country",
    type: "string",
    required: true,
  })
  
  from: string;

  @ApiProperty({
    name: "want",
    description: "Want Country",
    type: "string",
    required: true,
  })
  want: string;

  @ApiProperty({
    name: "amount",
    description: "Enter Amount",
    type: "number",
    required: true,
  })
  @IsNumber()
  @Min(0)
  amount: number;
}
