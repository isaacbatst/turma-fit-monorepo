import { WithId } from '../types/WithId';

export type RepositoryCrud<T extends WithId> = {
  create(item: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  update(updated: T): Promise<void>;
  remove(id: string): Promise<void>;
};
