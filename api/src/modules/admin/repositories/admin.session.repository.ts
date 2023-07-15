import { AdminSession } from '../entities/admin.session.entity';

export interface AdminSessionRepository {
  create(adminSession: AdminSession): Promise<void>;
  findByToken(token: string): Promise<AdminSession | null>;
  logout(adminSession: AdminSession): Promise<void>;
}
