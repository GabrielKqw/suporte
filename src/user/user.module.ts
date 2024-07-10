// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importe o PrismaModule

@Module({
  imports: [PrismaModule], // Use o PrismaModule
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Exporta o UserService para ser usado em outros módulos, como AuthModule
})
export class UserModule {}
