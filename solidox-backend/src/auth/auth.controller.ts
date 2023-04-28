import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp(@Body() details: SignUpDto) {
    console.log(typeof details);

    console.log(details);
    return details;
  }
}
