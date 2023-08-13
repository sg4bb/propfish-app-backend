import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshTokenGuard } from '../common/guards/rt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Tokens } from './types/tokens.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/register')
  register(
    @Body()
    registerDto: RegisterDto,
  ): Promise<Tokens> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('local/login')
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<Tokens> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(userId, refreshToken);
  }
}
