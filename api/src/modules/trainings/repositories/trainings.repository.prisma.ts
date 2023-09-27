import { PrismaErrorAdapter } from '../../../common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '../../../common/repositories/repository.prisma';
import { ExerciseSet } from '../entities/exercise-set.entity';
import { Training } from '../entities/training.entity';
import { TrainingsMapperRepositoryPrisma } from './trainings-mapper.repository.prisma';
import { TrainingsRepository } from './trainings.repository';

export class TrainingsRepositoryPrisma
  extends RepositoryPrisma<Training>
  implements TrainingsRepository
{
  errorAdapter = new PrismaErrorAdapter('training');
  mapper = new TrainingsMapperRepositoryPrisma();

  static readonly trainingInclude = {
    exerciseSets: {
      include: {
        exercises: {
          include: {
            equipments: true,
            moviment: {
              include: {
                muscle: true,
              },
            },
          },
        },
      },
    },
  };

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

      await Promise.all(
        exerciseSet.exercises.map(async (exercise) => {
          await this.prisma.exercise.create({
            data: {
              id: exercise.id,
              exerciseSetId: exerciseSet.id,
              grip: exercise.grip
                ? this.mapper.mapGripToPrisma(exercise.grip)
                : undefined,
              movimentId: exercise.moviment.id,
              equipments: {
                connect: exercise.equipments.map((equipment) => ({
                  id: equipment.id,
                })),
              },
            },
          });
        }),
      );
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
  }

  protected async unhandledFindAll(): Promise<Training[]> {
    const trainings = await this.prisma.training.findMany({
      include: TrainingsRepositoryPrisma.trainingInclude,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return trainings.map((training) =>
      this.mapper.mapTrainingToEntity(training),
    );
  }
  protected async unhandledFindById(id: string): Promise<Training | undefined> {
    const training = await this.prisma.training.findUnique({
      where: { id },
      include: TrainingsRepositoryPrisma.trainingInclude,
    });

    return training ? this.mapper.mapTrainingToEntity(training) : undefined;
  }

  protected unhandledUpdate(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.training.delete({
      where: { id },
    });
  }
}
