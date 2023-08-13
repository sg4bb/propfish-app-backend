import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationsModule],
  controllers: [UsersController],
  providers: [UsersService, OrganizationsService],
  exports: [UsersService],
})
export class UsersModule {}
