import { Admin } from '../entities/admin.entity';

export interface AdminRepository {
  create(admin: Admin): Promise<void>;
  findByEmail(email: string): Promise<Admin | null>;
}
