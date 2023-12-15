import { PrismaErrorAdapter } from '@/common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '@/common/repositories/repository.prisma';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Moviment } from '../entities/moviment.entity';
import {
  Moviment as PrismaMoviment,
  Muscle as PrismaMuscle,
} from '@prisma/client';

export class MovimentRepositoryPrisma extends RepositoryPrisma<Moviment> {
  static makeEntity(
    moviment: PrismaMoviment & { muscle: PrismaMuscle },
  ): Moviment {
    return new Moviment(
      moviment.id,
      moviment.name,
      new Muscle(moviment.muscle.id, moviment.muscle.name),
    );
  }

  errorAdapter: PrismaErrorAdapter = new PrismaErrorAdapter('moviment');

  protected async unhandledCreate(item: Moviment): Promise<void> {
    await this.prisma.moviment.create({
      data: {
        name: item.name,
        muscleId: item.muscle.id,
        id: item.id,
      },
    });
  }
  protected async unhandledFindAll(): Promise<Moviment[]> {
    const moviments = await this.prisma.moviment.findMany({
      include: { muscle: true },
    });
    return moviments.map((moviment) =>
      MovimentRepositoryPrisma.makeEntity(moviment),
    );
  }
  protected async unhandledFindById(id: string): Promise<Moviment | undefined> {
    const moviment = await this.prisma.moviment.findUnique({
      where: { id },
      include: { muscle: true },
    });
    return moviment
      ? new Moviment(
          moviment.id,
          moviment.name,
          new Muscle(moviment.muscle.id, moviment.muscle.name),
        )
      : undefined;
  }
  protected async unhandledUpdate(updated: Moviment): Promise<void> {
    await this.prisma.moviment.update({
      where: { id: updated.id },
      data: {
        muscleId: updated.muscle.id,
        name: updated.name,
      },
    });
  }
  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.moviment.delete({ where: { id } });
  }
}
