import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  hashRefreshToken: string;

  @OneToOne(() => User, (user) => user.hashRefreshToken)
  user: User[];
}
