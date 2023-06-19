import { Muscle } from '../entities/muscle.entity';
import { MusclesRepository } from './muscles.repository';

export class MusclesRepositoryMemory implements MusclesRepository {
  items: Muscle[] = [];

  async create(muscle: Muscle): Promise<void> {
    this.items.push(muscle);
  }

  async findAll(): Promise<Muscle[]> {
    return this.items;
  }

  async update(muscle: Muscle): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.id === muscle.id) {
        return muscle;
      }
      return item;
    });
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
