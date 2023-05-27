import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { success } from 'src/utils/utils.functions';
import { LoginDto, SignUpDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  @Post('signup')
  async signUp(@Body() details: SignUpDto) {
    // Create quote
    await db.quotes.create({
      data: {
        email: details.email,
        orgName: details.orgName,
      },
    });

    return success('Our team will get in touch with you soon!');
  }

  @Post('login')
  async login(@Body() creds: LoginDto) {
    // Ensure signature is not expired
    const signatureExpiryMinutes =
      this.configService.get<number>('SIGN_EXPIRY');
    if (Date.now() - creds.timestamp > 1000 * 60 * signatureExpiryMinutes) {
      throw new UnauthorizedException('Signature expired');
    }
  }
}
