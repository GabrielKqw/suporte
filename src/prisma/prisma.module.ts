// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o módulo global para que o PrismaService seja injetado em qualquer lugar
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o PrismaService para ser usado em outros módulos
})
export class PrismaModule {}
