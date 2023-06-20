import { Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from 'src/utils/db.instance';
import { ConfigService } from '@nestjs/config';
import { verifyMessage } from 'ethers';
import { success } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(orgName: string, email: string) {
    // Create quote
    await db.signup.create({
      data: {
        email: email,
        orgName: orgName,
      },
    });
  }

  async login(address: string, timestamp: number, signature: string) {
    // Ensure signature is not expired
    const signatureExpiryMinutes =
      this.configService.get<number>('SIGN_EXPIRY');
    if (Date.now() - timestamp > 1000 * 60 * signatureExpiryMinutes) {
      throw new UnauthorizedException('Signature expired');
    }

    const message = `${address}-${timestamp}`;
    const signerAddress = verifyMessage(message, signature);

    // Ensure address is valid
    if (signerAddress !== address) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Fetch account
    const account = await db.organization.findFirst({
      where: {
        address: address,
      },
    });
    if (!account) {
      throw new UnauthorizedException('Account not found');
    }

    const accessToken = this.jwtService.sign({
      address: address,
      orgId: account.id,
    });

    return {
      ...success('Login successful'),
      accessToken: accessToken,
      id: account.id,
    };
  }
}
