import { RepositoryMemory } from '@/common/repositories/repository.memory';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentsRepository } from './equipments.repository';

export class EquipmentsRepositoryMemory
  extends RepositoryMemory<Equipment>
  implements EquipmentsRepository
{
  async findByIds(ids: string[]): Promise<Equipment[]> {
    return this.items.filter((equipment) => ids.includes(equipment.id));
  }
}
