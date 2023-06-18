import { Inject } from '@nestjs/common';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from './admin.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';

export class AdminRepositoryPrisma implements AdminRepository {
  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}

  async create(admin: Admin): Promise<void> {
    await this.prisma.admin.create({
      data: {
        email: admin.getEmail(),
        name: admin.getName(),
        password: admin.getPassword(),
        id: admin.getId(),
      },
    });
  }
  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!admin) return null;
    return new Admin(admin);
  }
}
