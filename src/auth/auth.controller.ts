// auth.controller.ts
import { Controller, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto'; // Use o DTO do usuário
import { UserService } from '../user/user.service'; // Importe o UserService

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    private userService: UserService // Injete o UserService
  ) {}

  @Post('login') // Rota de login
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Retorna os dados do usuário autenticado
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // Chama o método create do UserService
  }
}
