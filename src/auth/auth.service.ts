import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto'; // Use o DTO do usuário
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // Remova a senha do resultado
      return result;
    }
    return null;
  }

  async login(createUserDto: CreateUserDto) {
    // Use o CreateUserDto
    const user = await this.validateUser(
      createUserDto.email,
      createUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role }; // Inclua o papel
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
