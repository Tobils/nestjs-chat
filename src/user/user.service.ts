import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ){}

  private readonly logger: Logger = new Logger('user-services')

  async create(createUserDto: CreateUserDto) {
    this.logger.log('Register User')
    const { name, email, password } = createUserDto

    try {
      const userMail = await this.emailService.create({
        email, password
      })
      
      const newUser = new User()
      newUser.name  = name

      const {uuid} = await this.userRepository.save(newUser)

      await this.userRepository.update(uuid, {
        email: userMail
      })

      return await this.userRepository.findOneOrFail(uuid)
      
    } catch (error) {
      throw new HttpException(
        {
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY, 
            data: {message: error}
        }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  
}
