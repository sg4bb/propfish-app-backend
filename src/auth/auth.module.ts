import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { TokensService } from './tokens.service';
import { TokensUtilities } from './utils/tokens.util';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokensUtilities,
    TokensService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
