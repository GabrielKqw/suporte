
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {} 

  async create(createTicketDto: CreateTicketDto, userId: number) {
    return this.prisma.ticket.create({
      data: {
        title: createTicketDto.title,
        content: createTicketDto.content,
        support: {
          connect: {
            id: createTicketDto.supportId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
        support: true,
      },
    });
  }

  findAll() {
    return this.prisma.ticket.findMany({
      include: {
        user: true,
        support: true,
      },
    });
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        support: true,
      },
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
      include: {
        user: true,
        support: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.ticket.delete({ where: { id } });
  }
}
