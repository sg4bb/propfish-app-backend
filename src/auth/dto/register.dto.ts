import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  membership: string;

  profile_pic: string;

  @IsString()
  mobile: string;

  @IsString()
  @IsOptional()
  organization?: string;
}
