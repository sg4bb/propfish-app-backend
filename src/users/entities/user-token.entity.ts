import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserToken {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @Column()
  hashRefreshToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
