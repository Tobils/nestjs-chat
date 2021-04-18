import { Injectable, Logger } from '@nestjs/common';
import { CreateEmailDto } from 'src/email/dto/create-email.dto';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService
    ){}

    private readonly logger: Logger = new Logger('auth-service')

    async register(registerDto: RegisterDto){
        const createUserDto: CreateUserDto = registerDto

        try {
            await this.userService.create(createUserDto)
        } catch (error) {
            
        }
    }

    async login(loginDto: LoginDto){}
}
