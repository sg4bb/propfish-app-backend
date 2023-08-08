import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateHashRefreshToken(id: string, hashRefreshToken: string) {
    return await this.userRepository.update(id, {
      hashRefreshToken: `${hashRefreshToken}`,
    });
  }

  async deleteToken(id: string) {
    const user = await this.userRepository.findBy({ id });

    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.update(id, {
      hashRefreshToken: null,
    });
  }
}
