import { RepositoryCrud } from '@/common/repositories/repository.crud';
import { ExerciseSet } from '../entities/exercise-set.entity';
import { Training } from '../entities/training.entity';

export type TrainingsRepository = RepositoryCrud<Training> & {
  addExerciseSet(
    training: Training,
    exerciseSet: ExerciseSet,
    order: number,
  ): Promise<void>;
  updateExerciseSetOrders(training: Training): Promise<void>;
  removeExerciseSet(training: Training, exerciseSetId: string): Promise<void>;
};
