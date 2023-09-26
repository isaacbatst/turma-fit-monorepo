import { Equipment } from '../entities/equipment.entity';

export interface EquipmentsRepository {
  create(equipment: Equipment): Promise<void>;
  findAll(): Promise<Equipment[]>;
  findByIds(ids: string[]): Promise<Equipment[]>;
  update(equipment: Equipment): Promise<void>;
  remove(id: string): Promise<void>;
}
