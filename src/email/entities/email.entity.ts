import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('email')
@Unique(['email'])
export class Email extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string
    
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToOne(() => User, user => user.email, {
        cascade: true
    })
    user: User

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type:'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deleted_at: Date;

    async validatePassword(password: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password,this.password)
        return isMatch;
    }
}