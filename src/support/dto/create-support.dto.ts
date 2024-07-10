import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSupportDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number; // ID da empresa à qual o suporte pertence
}
