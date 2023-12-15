import { RepositoryMemory } from '@/common/repositories/repository.memory';
import { Training } from '../entities/training.entity';
import { TrainingsRepository } from './trainings.repository';

export class TrainingsRepositoryMemory
  extends RepositoryMemory<Training>
  implements TrainingsRepository
{
  async addExerciseSet() {}
  async updateExerciseSetOrders() {}
  async removeExerciseSet() {}
}
