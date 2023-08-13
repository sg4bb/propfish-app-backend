import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  organization: string;

  @IsString()
  @IsOptional()
  logo: string;
}
