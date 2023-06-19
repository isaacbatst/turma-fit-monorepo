import { Inject } from '@nestjs/common';
import { Muscle } from '../entities/muscle.entity';
import { MusclesRepository } from './muscles.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaService } from '../../core/DataSource/prisma.service';

export class MusclesRepositoryPrisma implements MusclesRepository {
  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}
  async create(muscle: Muscle): Promise<void> {
    await this.prisma.muscle.create({
      data: {
        name: muscle.name,
        id: muscle.id,
      },
    });
  }
  async findAll(): Promise<Muscle[]> {
    const mucles = await this.prisma.muscle.findMany();
    return mucles.map((muscle) => new Muscle(muscle.id, muscle.name));
  }
  async update(muscle: Muscle): Promise<void> {
    await this.prisma.muscle.update({
      data: {
        name: muscle.name,
      },
      where: {
        id: muscle.id,
      },
    });
  }
  async remove(id: string): Promise<void> {
    await this.prisma.muscle.delete({
      where: {
        id: id,
      },
    });
  }
}
