import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

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

  @Column({ default: null })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.id, {
    eager: true,
  })
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
