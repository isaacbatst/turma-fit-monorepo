import { RepositoryMemory } from '@/common/repositories/repository.memory';
import { Muscle } from '../entities/muscle.entity';
import { MusclesRepository } from './muscles.repository';

export class MusclesRepositoryMemory
  extends RepositoryMemory<Muscle>
  implements MusclesRepository {}
