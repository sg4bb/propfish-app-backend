import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  organization: string;

  @Column({ nullable: true })
  logo: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => User, (user) => user.organization)
  user: User[];
}
