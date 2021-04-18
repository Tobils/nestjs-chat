import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
