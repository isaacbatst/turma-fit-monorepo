import { PrismaErrorAdapter } from '@/common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '@/common/repositories/repository.prisma';
import { Muscle } from '../entities/muscle.entity';

export class MusclesRepositoryPrisma extends RepositoryPrisma<Muscle> {
  readonly errorAdapter = new PrismaErrorAdapter('muscle');

  protected async unhandledCreate(item: Muscle): Promise<void> {
    await this.prisma.muscle.create({
      data: {
        name: item.name,
        id: item.id,
      },
    });
  }

  protected async unhandledFindAll(): Promise<Muscle[]> {
    const mucles = await this.prisma.muscle.findMany();
    return mucles.map((muscle) => new Muscle(muscle.id, muscle.name));
  }

  protected async unhandledFindById(id: string): Promise<Muscle | undefined> {
    const muscle = await this.prisma.muscle.findUnique({
      where: { id },
    });
    return muscle ? new Muscle(muscle.id, muscle.name) : undefined;
  }

  protected async unhandledUpdate(updated: Muscle): Promise<void> {
    await this.prisma.muscle.update({
      data: {
        name: updated.name,
      },
      where: {
        id: updated.id,
      },
    });
  }

  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.muscle.delete({
      where: {
        id: id,
      },
    });
  }
}
