import { AdminSession } from '../entities/admin.session.entity';
import { AdminSessionRepository } from './admin.session.repository';

export class AdminSessionRepositoryMemory implements AdminSessionRepository {
  items: AdminSession[] = [];

  async create(session: AdminSession): Promise<void> {
    this.items.push(session);
  }

  async findByToken(token: string): Promise<AdminSession | null> {
    return this.items.find((item) => item.getToken() === token) ?? null;
  }

  async logout(adminSession: AdminSession): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.getToken() === adminSession.getToken(),
    );
    if (index < 0) return;
    this.items[index] = adminSession;
  }
}
