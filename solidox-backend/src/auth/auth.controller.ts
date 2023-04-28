import { Body, Controller, Get, Post } from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { success } from 'src/utils/utils.functions';
import { SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp(@Body() details: SignUpDto) {
    // Create quote
    await db.quotes.create({
      data: {
        email: details.email,
        orgName: details.orgName,
      },
    });

    return success('Sign up request received');
  }
}
