import { Inject } from '@nestjs/common';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from './admin.repository';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaErrorAdapter } from '../../../adapters/prisma-errors.adapter';

export class AdminRepositoryPrisma implements AdminRepository {
  private readonly prismaErrorAdapter = new PrismaErrorAdapter('admin');

  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}

  async create(admin: Admin): Promise<void> {
    try {
      await this.prisma.admin.create({
        data: {
          email: admin.getEmail(),
          name: admin.getName(),
          password: admin.getPassword(),
          id: admin.getId(),
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
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
