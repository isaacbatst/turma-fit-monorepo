import { Inject, Injectable } from '@nestjs/common';
import { ADMIN_SESSION_REPOSITORY } from '../../constants/tokens';
import { AdminSessionRepository } from '../admin/repositories/admin.session.repository';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ADMIN_SESSION_REPOSITORY)
    private readonly adminSessionRepository: AdminSessionRepository,
  ) {}

  async findRoleBySessionToken(token: string): Promise<Role | null> {
    const adminSession = await this.adminSessionRepository.findByToken(token);

    if (adminSession) {
      return Role.admin;
    }

    return null;
  }
}
