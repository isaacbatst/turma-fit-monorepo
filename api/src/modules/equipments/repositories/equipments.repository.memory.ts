import { RepositoryMemory } from '../../../common/repositories/repository.memory';
import { Equipment } from '../entities/equipment.entity';
import { EquipmentsRepository } from './equipments.repository';

export class EquipmentsRepositoryMemory
  extends RepositoryMemory<Equipment>
  implements EquipmentsRepository {}
