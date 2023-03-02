import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, Min, min, MinLength } from "class-validator";

export class GetDataDto {
  @MinLength(2)
  @MaxLength(3)
  @ApiProperty({
    name: "from",
    description: "From Country",
    type: "string",
    required: true,
  })
  from: string;

  @MinLength(2)
  @MaxLength(3)
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
  @Min(0)
  amount: number;
}
