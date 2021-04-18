import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/email.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(Email)
        private readonly emailRepository: Repository<Email>
    ){}

    async create(
        createEmailDto: CreateEmailDto
    ) : Promise<Email>
    {
        const { email, password } = createEmailDto
        const newEmail: Email = new Email()
        newEmail.email = email
        newEmail.salt = await bcrypt.genSalt()
        newEmail.password = await this.hashPassword(password, newEmail.salt)

        try {
            const {uuid} = await this.emailRepository.save(newEmail)
            return await this.emailRepository.findOneOrFail(uuid)
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY, 
                    data: {message: error}
                }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }




    async validatePassword(email: string, password: string): Promise<Email>{
        const mail = await this.emailRepository.findOneOrFail({email: email})
        if(typeof mail == 'undefined'){
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY, 
                    data: {message: "Email does not exist"}
                }, HttpStatus.UNPROCESSABLE_ENTITY)
        } 

        const is_validated = await mail.validatePassword(password)
        if(!is_validated) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY, 
                    data: {message: "PAssword not validated"}
                }, HttpStatus.UNAUTHORIZED)
        }

        return mail;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
   
}
