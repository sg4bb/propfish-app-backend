import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtPayloadType } from '../types/jwt-payload.type';
import { Tokens } from '../types/tokens.type';

dotenv.config();

@Injectable()
export class TokensUtilities {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayloadType = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
