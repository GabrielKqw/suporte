// support.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async create(createSupportDto: CreateSupportDto) {
    const { companyId, ...supportData } = createSupportDto; // Desestruturação para remover companyId

    return this.prisma.support.create({
      data: {
        ...supportData, // Usa os dados restantes (name, description)
        company: {
          connect: {
            id: companyId, // Conecta o suporte à empresa usando o ID
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.support.findMany({
      include: { company: true },
    });
  }

  async findOne(id: number) {
    const support = await this.prisma.support.findUnique({
      where: { id },
      include: { company: true },
    });
    if (!support) {
      throw new NotFoundException(`Support with ID ${id} not found`);
    }
    return support;
  }

  async update(id: number, updateSupportDto: UpdateSupportDto) {
    const { companyId, ...supportData } = updateSupportDto; // Desestruturação para remover companyId (opcional)

    return this.prisma.support.update({
      where: { id },
      data: {
        ...supportData, // Atualiza os dados restantes (name, description)
        company: companyId
          ? {
              connect: {
                id: companyId, // Conecta a uma nova empresa se companyId for fornecido
              },
            }
          : undefined, // Não altera a empresa se companyId não for fornecido
      },
    });
  }

  async remove(id: number) {
    await this.prisma.support.delete({ where: { id } });
  }
}
