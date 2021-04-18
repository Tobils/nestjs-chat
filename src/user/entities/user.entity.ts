import { Email } from "src/email/entities/email.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('user')
@Unique(['name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column()
    name: string

    @OneToOne(() => Email, email => email.user, {
        eager: true
    })
    @JoinColumn()
    email: Email

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type:'timestamp'})
    updated_at: Date;

    @DeleteDateColumn({type: 'timestamp'})
    deleted_at: Date;
}
