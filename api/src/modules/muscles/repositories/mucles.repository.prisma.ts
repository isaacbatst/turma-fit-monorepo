import {
  ConflictException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Muscle } from '../entities/muscle.entity';
import { MusclesRepository } from './muscles.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { Prisma } from '@prisma/client';

export class MusclesRepositoryPrisma implements MusclesRepository {
  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}
  async create(muscle: Muscle): Promise<void> {
    try {
      await this.prisma.muscle.create({
        data: {
          name: muscle.name,
          id: muscle.id,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        const repeatedField = (err.meta?.target as string[])[0];
        const message = `${repeatedField.toUpperCase()}_ALREADY_EXISTS`;
        throw new ConflictException({ message });
      }
    }
  }
  async findAll(): Promise<Muscle[]> {
    const mucles = await this.prisma.muscle.findMany();
    return mucles.map((muscle) => new Muscle(muscle.id, muscle.name));
  }
  async update(muscle: Muscle): Promise<void> {
    try {
      await this.prisma.muscle.update({
        data: {
          name: muscle.name,
        },
        where: {
          id: muscle.id,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          const repeatedField = (err.meta?.target as string[])[0];
          const message = `${repeatedField.toUpperCase()}_ALREADY_EXISTS`;
          throw new ConflictException({ message });
        }

        if (err.code === 'P2025') {
          const message = `MUSCLE_NOT_FOUND`;
          throw new NotFoundException({ message });
        }
      }

      console.error(err);
      throw new InternalServerErrorException();
    }
  }
  async remove(id: string): Promise<void> {
    await this.prisma.muscle.delete({
      where: {
        id: id,
      },
    });
  }
}
