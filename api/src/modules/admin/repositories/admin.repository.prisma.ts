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

    return admin ? new Admin(admin) : null;
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: id,
      },
    });

    return admin ? new Admin(admin) : null;
  }
}
