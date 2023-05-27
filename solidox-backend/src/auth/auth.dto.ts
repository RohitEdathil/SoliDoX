import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  orgName: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsNotEmpty()
  signature: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  timestamp: number;
}
