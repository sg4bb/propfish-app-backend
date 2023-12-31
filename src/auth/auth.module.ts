import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { UserToken } from '../users/entities/user-token.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { TokensService } from './tokens.service';
import { TokensUtilities } from './utils/tokens.util';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, UserToken]),
    JwtModule.register({}),
    OrganizationsModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokensUtilities,
    TokensService,
    UsersService,
    OrganizationsService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
