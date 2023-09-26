import { Grip as PrismaGrip } from '@prisma/client';
import { PrismaErrorAdapter } from '../../../common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '../../../common/repositories/repository.prisma';
import { ExerciseSet } from '../entities/exercise-set.entity';
import { Training } from '../entities/training.entity';
import { TrainingsRepository } from './trainings.repository';
import { Grip } from '../entities/grip.enum';

export class TrainingsRepositoryPrisma
  extends RepositoryPrisma<Training>
  implements TrainingsRepository
{
  errorAdapter = new PrismaErrorAdapter('training');

  async addExerciseSet(
    training: Training,
    exerciseSet: ExerciseSet,
  ): Promise<void> {
    try {
      await this.prisma.exerciseSet.create({
        data: {
          id: exerciseSet.id,
          repetitions: exerciseSet.repetitions,
          sets: exerciseSet.sets,
          restTime: exerciseSet.restTime,
          training: {
            connect: {
              id: training.id,
            },
          },
        },
      });
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }

  protected async unhandledCreate(item: Training): Promise<void> {
    await this.prisma.training.create({
      data: {
        id: item.id,
      },
    });

    await Promise.all(
      item.exerciseSets.map((set) => {
        return this.addExerciseSet(item, set);
      }),
    );

    await Promise.all(
      item.exerciseSets.map((set, index) => {
        return this.prisma.exercise.createMany({
          data: item.exerciseSets[index].exercises.map((exercise) => {
            return {
              id: exercise.id,
              grip: exercise.grip ? this.mapGripToPrisma(exercise.grip) : null,
              exerciseSetId: set.id,
              movimentId: exercise.moviment.id,
            };
          }),
        });
      }),
    );
  }

  protected unhandledFindAll(): Promise<Training[]> {}
  protected unhandledFindById(id: string): Promise<Training | undefined> {}
  protected unhandledUpdate(updated: Training): Promise<void> {}
  protected unhandledRemove(id: string): Promise<void> {}

  private mapGripToPrisma(grip: Grip): PrismaGrip {
    switch (grip) {
      case Grip.supinated:
        return PrismaGrip.SUPINATED;
      case Grip.pronated:
        return PrismaGrip.PRONATED;
      case Grip.neutral:
        return PrismaGrip.NEUTRAL;
    }
  }
}
