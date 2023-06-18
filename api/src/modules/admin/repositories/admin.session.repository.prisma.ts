import { Inject } from '@nestjs/common';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { AdminSession } from '../entities/admin.session.entity';
import { AdminSessionRepository } from './admin.session.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';

export class AdminSessionRepositoryPrisma implements AdminSessionRepository {
  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}

  async create(session: AdminSession): Promise<void> {
    await this.prisma.adminSession.create({
      data: {
        createdAt: session.getCreatedAt(),
        expiresIn: session.getExpiresIn(),
        token: session.getToken(),
        userId: session.getUserId(),
      },
    });
  }
}
