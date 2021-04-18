import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    UserModule,
    EmailModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
