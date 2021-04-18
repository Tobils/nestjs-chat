import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class CreateEmailDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
} 