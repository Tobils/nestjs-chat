import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    private readonly logger: Logger = new Logger('auth-controller')

    @Post('/register')
    registerUser(
        @Body() registerDto: RegisterDto
    ){
        this.logger.log('user register')
        return this.authService.register(registerDto)
    }

    @Post('/login')
    loginUser(
        @Body() loginDto: LoginDto
    ){
        this.logger.log('user login')
        return this.authService.login(loginDto)
    }
}
