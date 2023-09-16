import { Admin } from '../entities/admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminSessionRepositoryMemory } from './admin.session.repository.memory';

export class AdminRepositoryMemory implements AdminRepository {
  items: Admin[] = [];

  constructor(private sessionRepository: AdminSessionRepositoryMemory) {}

  async create(admin: Admin): Promise<void> {
    this.items.push(admin);
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.items.find((item) => item.getEmail() === email) ?? null;
  }

  async findById(id: string): Promise<Admin | null> {
    return this.items.find((item) => item.getId() === id) ?? null;
  }
}
