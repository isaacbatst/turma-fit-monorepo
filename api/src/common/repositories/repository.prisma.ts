import { Inject } from '@nestjs/common';
import { PRISMA_SERVICE } from '../../constants/tokens';
import { PrismaService } from '../../modules/core/DataSource/prisma.service';
import { RepositoryCrud } from './repository.crud';
import { WithId } from '../types/WithId';
import { PrismaErrorAdapter } from '../adapters/prisma-errors.adapter';

export abstract class RepositoryPrisma<T extends WithId>
  implements RepositoryCrud<T>
{
  abstract errorAdapter: PrismaErrorAdapter;

  constructor(@Inject(PRISMA_SERVICE) private _prisma: PrismaService) {}

  get prisma(): PrismaService {
    return this._prisma;
  }

  async create(item: T): Promise<void> {
    try {
      await this.unhandledCreate(item);
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const items = await this.unhandledFindAll();
      return items;
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }
  async findById(id: string): Promise<T | undefined> {
    try {
      const item = this.unhandledFindById(id);
      return item;
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }
  async update(updated: T): Promise<void> {
    try {
      await this.unhandledUpdate(updated);
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }
  async remove(id: string): Promise<void> {
    try {
      await this.unhandledRemove(id);
    } catch (err) {
      this.errorAdapter.adapt(err);
    }
  }

  protected abstract unhandledCreate(item: T): Promise<void>;
  protected abstract unhandledFindAll(): Promise<T[]>;
  protected abstract unhandledFindById(id: string): Promise<T | undefined>;
  protected abstract unhandledUpdate(updated: T): Promise<void>;
  protected abstract unhandledRemove(id: string): Promise<void>;
}
