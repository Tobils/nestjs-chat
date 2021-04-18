import { Email } from "src/email/entities/email.entity";
import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column()
    name: string

    @OneToOne(() => Email, email => email.user, {
        eager: true
    })
    email: Email
}
