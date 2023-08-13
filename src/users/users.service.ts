import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly organizationService: OrganizationsService,
  ) {}

  /***
   * create user
   */
  async create(createUserDto: CreateUserDto) {
    let organization = undefined;

    if (createUserDto.organization) {
      organization = await this.organizationService.findOneByName(
        createUserDto.organization,
      );

      if (!organization) {
        throw new BadRequestException('Organization not found');
      }
    }

    return await this.userRepository.save({
      ...createUserDto,
      id: uuidv4(),
      organization,
    });
  }

  /***
   * consult users (All, ByEmail, One)
   */
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  /***
   * update user
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    let organization;

    if (updateUserDto.organization) {
      organization = await this.organizationService.findOneByName(
        updateUserDto.organization,
      );

      if (!organization) {
        throw new BadRequestException('Organization not found');
      }
    }

    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
      organization,
    });
  }

  /***
   * remove user
   */
  async remove(id: string) {
    return await this.userRepository.softDelete({ id });
  }

  /***
   * recover user
   */
  async recover(id: string) {
    return await this.userRepository.restore({ id });
  }
}
