import { PrismaErrorAdapter } from '../../../common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '../../../common/repositories/repository.prisma';
import { Equipment } from '../entities/equipment.entity';

export class EquipmentsRepositoryPrisma extends RepositoryPrisma<Equipment> {
  errorAdapter = new PrismaErrorAdapter('equipment');

  protected async unhandledCreate(item: Equipment): Promise<void> {
    await this.prisma.equipment.create({
      data: {
        name: item.name,
        id: item.id,
      },
    });
  }

  protected async unhandledFindAll(): Promise<Equipment[]> {
    const mucles = await this.prisma.equipment.findMany();
    return mucles.map(
      (equipment) => new Equipment(equipment.id, equipment.name),
    );
  }

  protected async unhandledFindById(
    id: string,
  ): Promise<Equipment | undefined> {
    const equipment = await this.prisma.equipment.findUnique({
      where: {
        id: id,
      },
    });
    return equipment ? new Equipment(equipment.id, equipment.name) : undefined;
  }

  protected async unhandledUpdate(updated: Equipment): Promise<void> {
    await this.prisma.equipment.update({
      data: {
        name: updated.name,
      },
      where: {
        id: updated.id,
      },
    });
  }

  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.equipment.delete({
      where: {
        id: id,
      },
    });
  }
}
