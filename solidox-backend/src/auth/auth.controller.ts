import { Body, Controller, Post } from '@nestjs/common';
import { success } from 'src/utils/utils.functions';
import { LoginDto, SignUpDto } from './auth.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() details: SignUpDto) {
    this.authService.signUp(details.orgName, details.email);
    return success('Our team will get in touch with you soon!');
  }

  @Post('login')
  async login(@Body() creds: LoginDto) {
    return this.authService.login(
      creds.address,
      creds.timestamp,
      creds.signature,
    );
  }
}
