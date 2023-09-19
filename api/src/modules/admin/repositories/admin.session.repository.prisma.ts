import { Inject } from '@nestjs/common';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { AdminSession } from '../entities/admin.session.entity';
import { AdminSessionRepository } from './admin.session.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaErrorAdapter } from '../../../adapters/prisma-errors.adapter';

export class AdminSessionRepositoryPrisma implements AdminSessionRepository {
  private readonly prismaErrorAdapter = new PrismaErrorAdapter('adminSession');
  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}
  async logout(adminSession: AdminSession): Promise<void> {
    try {
      await this.prisma.adminSession.update({
        where: { token: adminSession.getToken() },
        data: { loggedOutAt: adminSession.getLoggedOutAt() },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
  async findByToken(token: string): Promise<AdminSession | null> {
    const adminSession = await this.prisma.adminSession.findUnique({
      where: { token },
    });

    return adminSession ? new AdminSession(adminSession) : null;
  }

  async create(session: AdminSession): Promise<void> {
    try {
      await this.prisma.adminSession.create({
        data: {
          createdAt: session.getCreatedAt(),
          expiresIn: session.getExpiresIn(),
          token: session.getToken(),
          userId: session.getUserId(),
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
}
