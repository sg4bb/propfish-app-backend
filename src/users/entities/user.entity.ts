import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserToken } from './user-tokens.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  membership?: string;

  @Column()
  mobile: string;

  @Column({ default: 'https://i.imgur.com/be6Eqq9.jpg' })
  profile_pic: string;

  @Column()
  organization?: string;

  @OneToOne(() => UserToken, (usertoken) => usertoken.id, {
    eager: true,
  })
  hashRefreshToken: UserToken;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
