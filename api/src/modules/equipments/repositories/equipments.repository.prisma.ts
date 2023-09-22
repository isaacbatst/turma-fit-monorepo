import { Inject } from '@nestjs/common';
import { PrismaErrorAdapter } from '../../../common/adapters/prisma-errors.adapter';
import { PRISMA_SERVICE } from '../../../constants/tokens';
import { PrismaService } from '../../core/DataSource/prisma.service';
import { EquipmentsRepository } from './equipments.repository';
import { Equipment } from '../entities/equipment.entity';

export class EquipmentsRepositoryPrisma implements EquipmentsRepository {
  private readonly prismaErrorAdapter = new PrismaErrorAdapter('equipment');

  constructor(@Inject(PRISMA_SERVICE) private prisma: PrismaService) {}
  async create(equipment: Equipment): Promise<void> {
    try {
      await this.prisma.equipment.create({
        data: {
          name: equipment.name,
          id: equipment.id,
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
  async findAll(): Promise<Equipment[]> {
    const mucles = await this.prisma.equipment.findMany();
    return mucles.map(
      (equipment) => new Equipment(equipment.id, equipment.name),
    );
  }
  async update(equipment: Equipment): Promise<void> {
    try {
      await this.prisma.equipment.update({
        data: {
          name: equipment.name,
        },
        where: {
          id: equipment.id,
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
  async remove(id: string): Promise<void> {
    try {
      await this.prisma.equipment.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      this.prismaErrorAdapter.adapt(err);
    }
  }
}
