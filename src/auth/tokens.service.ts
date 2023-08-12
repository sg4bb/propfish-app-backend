import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserToken } from '../users/entities/user-token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(UserToken)
    private readonly tokenRepository: Repository<UserToken>,

    private readonly usersServices: UsersService,
  ) {}

  /***
   * find a token
   */
  async findToken(userId: string) {
    const user = await this.usersServices.findOne(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isToken = await this.tokenRepository.findOneBy({ userId: user.id });

    if (!isToken) {
      throw new HttpException('Token not found', HttpStatus.BAD_REQUEST);
    }

    return isToken.hashRefreshToken;
  }

  /***
   * update an existing user HashRefreshToken
   */
  async updateHashRefreshToken(userId: string, hashRefreshToken: string) {
    await this.deleteToken(userId);
    const newToken = await this.createToken(userId, hashRefreshToken);

    return {
      refresh_token: newToken.hashRefreshToken,
      email: newToken.user.email,
    };
  }

  /***
   * create a token
   */
  async createToken(userId: string, hashRefreshToken: string) {
    const user = await this.usersServices.findOne(userId);

    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const newToken = {
      id: String(Date.now()),
      hashRefreshToken: hashRefreshToken,
      user,
    };

    return await this.tokenRepository.save(newToken);
  }

  /***
   * delete a token
   */
  async deleteToken(userId: string) {
    const user = await this.usersServices.findOne(userId);

    if (!user) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return await this.tokenRepository.delete({ user });
  }
}
