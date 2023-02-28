export class  LoginResDto{
  message:string;
  token:string
  constructor(message,token) {
    this.message = message;
    this.token=token;
  }
}