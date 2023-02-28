export class CurrencyDto {
  From: string;
  To: string;
  EnterAmount: number;
  Converted_Amount: number;

  constructor(From,To,EnterAmount,Converted_Amount) {
    this.From = From;
    this.To = To;
    this.EnterAmount = EnterAmount;
    this.Converted_Amount = Converted_Amount;
  }
}
