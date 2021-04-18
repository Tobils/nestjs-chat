import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Email
    ])
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
