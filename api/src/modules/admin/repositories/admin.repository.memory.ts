import { Admin } from '../entities/admin.entity';
import { AdminRepository } from './admin.repository';

export class AdminRepositoryMemory implements AdminRepository {
  items: Admin[] = [];

  async create(admin: Admin): Promise<void> {
    this.items.push(admin);
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.items.find((item) => item.getEmail() === email) ?? null;
  }
}
