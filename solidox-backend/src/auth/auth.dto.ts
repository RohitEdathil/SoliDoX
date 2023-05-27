import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  orgName: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsNotEmpty()
  address: string;

  @IsEmail()
  signature: string;
}
