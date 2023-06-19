import { AdminSession } from '../entities/admin.session.entity';

export interface AdminSessionRepository {
  create(session: AdminSession): Promise<void>;
  findByToken(token: string): Promise<AdminSession | null>;
}
