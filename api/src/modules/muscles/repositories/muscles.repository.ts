import { Muscle } from '../entities/muscle.entity';

export interface MusclesRepository {
  create(muscle: Muscle): Promise<void>;
  findAll(): Promise<Muscle[]>;
  update(muscle: Muscle): Promise<void>;
  remove(id: string): Promise<void>;
}
