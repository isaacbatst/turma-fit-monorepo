import { WithId } from '../types/WithId';

export class RepositoryMemory<T extends WithId> {
  items: T[] = [];

  async create(item: T): Promise<void> {
    this.items.push(item);
  }

  async findAll(): Promise<T[]> {
    return this.items;
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
