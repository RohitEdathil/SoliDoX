import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OrgController } from './org/org.controller';
import { DocController } from './doc/doc.controller';
import { DocService } from './doc/doc.service';
import { StorageService } from './utils/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // Register JWT module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, AuthController, OrgController, DocController],
  providers: [AppService, AuthService, DocService, StorageService],
})
export class AppModule {}
