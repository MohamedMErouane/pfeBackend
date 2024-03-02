import { IsEmail, IsString } from "class-validator";


export class LoginDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}