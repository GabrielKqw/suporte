import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(['CUSTOMER', 'MODERATOR', 'ADMIN', 'COMPANY'])
  role?: 'CUSTOMER' | 'MODERATOR' | 'ADMIN' | 'COMPANY';

  @IsOptional()
  companyId?: number;
}
