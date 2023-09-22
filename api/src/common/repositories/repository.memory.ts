import { WithId } from '../types/WithId';
import { RepositoryCrud } from './repository.crud';

export class RepositoryMemory<T extends WithId> implements RepositoryCrud<T> {
  items: T[] = [];

  async create(item: T): Promise<void> {
    this.items.push(item);
  }

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async findById(id: string): Promise<T | undefined> {
    return this.items.find((item) => item.id === id);
  }

  async update(updated: T): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.id === updated.id) {
        return updated;
      }
      return item;
    });
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
