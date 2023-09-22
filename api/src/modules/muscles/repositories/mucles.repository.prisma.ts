import { Inject } from '@nestjs/common';
import { PrismaErrorAdapter } from '../../../common/adapters/prisma-errors.adapter';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { Muscle } from '../entities/muscle.entity';
import { MusclesRepository } from './muscles.repository';

export class MusclesRepositoryPrisma implements MusclesRepository {
  private readonly prismaErrorAdapter = new PrismaErrorAdapter('muscle');

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
      this.prismaErrorAdapter.adapt(err);
    }
  }
  async findById(id: string): Promise<Muscle | undefined> {
    const muscle = await this.prisma.muscle.findUnique({
      where: { id },
    });
    return muscle ? new Muscle(muscle.id, muscle.name) : undefined;
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
      this.prismaErrorAdapter.adapt(err);
    }
  }
  async remove(id: string): Promise<void> {
    try {
      await this.prisma.muscle.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
}
