import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  /***
   * create user
   */
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save({
      ...createUserDto,
      id: uuidv4(),
    });
  }

  /***
   * consult users (All, ByEmail, One)
   */
  findAll() {
    return `This action returns all users`;
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
    //logic

    return await this.userRepository.update(id, {
      ...updateUserDto,
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
