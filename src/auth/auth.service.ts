import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokensService } from './tokens.service';
import { Tokens } from './types/tokens.type';
import { TokensUtilities } from './utils/tokens.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly tokensUtilities: TokensUtilities,

    private readonly tokensService: TokensService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Tokens> {
    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    registerDto = {
      ...registerDto,
      password: await bcryptjs.hash(registerDto.password, 10),
    };

    const newUser = await this.usersService.create(registerDto);

    const tokens = await this.tokensUtilities.getTokens(
      newUser.id,
      newUser.email,
    );

    const hashRefreshToken = await bcryptjs.hash(tokens.refresh_token, 10);

    await this.tokensService.updateHashRefreshToken(
      newUser.id,
      hashRefreshToken,
    );

    return tokens;
  }

  async login({ email, password }: LoginDto): Promise<Tokens> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('Email or password wrong', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Email or password wrong',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = await this.tokensUtilities.getTokens(user.id, user.email);

    const hashRefreshToken = await bcryptjs.hash(tokens.refresh_token, 10);

    await this.tokensService.updateHashRefreshToken(user.id, hashRefreshToken);

    return tokens;
  }

  async logout(userId: string) {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.tokensService.deleteToken(userId);
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    const hashToken = await this.tokensService.findToken(userId);

    if (!user || !hashToken) {
      throw new UnauthorizedException();
    }

    const isRefreshValid = await bcryptjs.compare(refreshToken, hashToken);

    if (!isRefreshValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokensUtilities.getTokens(user.id, user.email);

    const hashRefreshToken = await bcryptjs.hash(tokens.refresh_token, 10);

    await this.tokensService.updateHashRefreshToken(user.id, hashRefreshToken);

    return tokens;
  }
}
