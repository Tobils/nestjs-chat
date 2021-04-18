import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, privateSecret, signOptions } from 'src/config/utils';

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
            const {uuid} = await this.userService.create(createUserDto)
            const access_token = await this.generateToken({uuid})
            return {
                message: 'success to registered !',
                payload: {
                    access_token: access_token
                }
            }

        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY, 
                    data: {message: error}
                }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }


    async login(loginDto: LoginDto){
        const { email, password } = loginDto
        const { uuid } = await this.emailService.validatePassword(email, password)

        const access_token = await this.generateToken({uuid})
            return {
                message: 'success to registered !',
                payload: {
                    access_token: access_token
                }
            }
    }


    async generateToken(jwtPayload: JwtPayload){
        return await jwt.sign(jwtPayload, privateSecret, signOptions)
    }
}
