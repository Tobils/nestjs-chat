import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, AuthModule, EmailModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
