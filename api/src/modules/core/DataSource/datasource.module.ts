import { Module } from '@nestjs/common';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  EQUIPMENT_REPOSITORY,
  MOVIMENT_REPOSITORY,
  MUSCLE_REPOSITORY,
  PRISMA_SERVICE,
} from '../../../constants/tokens';
import { AdminRepositoryPrisma } from '../../admin/repositories/admin.repository.prisma';
import { AdminSessionRepositoryPrisma } from '../../admin/repositories/admin.session.repository.prisma';
import { PrismaService } from './prisma.service';
import { MusclesRepositoryPrisma } from '../../muscles/repositories/mucles.repository.prisma';
import { EquipmentsRepositoryPrisma } from '../../equipments/repositories/equipments.repository.prisma';
import { MovimentRepositoryPrisma } from '../../moviments/repositories/moviments.repository.prisma';

@Module({
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: ADMIN_REPOSITORY,
      useClass: AdminRepositoryPrisma,
    },
    {
      provide: ADMIN_SESSION_REPOSITORY,
      useClass: AdminSessionRepositoryPrisma,
    },
    {
      provide: MUSCLE_REPOSITORY,
      useClass: MusclesRepositoryPrisma,
    },
    {
      provide: EQUIPMENT_REPOSITORY,
      useClass: EquipmentsRepositoryPrisma,
    },
    {
      provide: MOVIMENT_REPOSITORY,
      useClass: MovimentRepositoryPrisma,
    },
  ],
  exports: [
    PRISMA_SERVICE,
    ADMIN_REPOSITORY,
    ADMIN_SESSION_REPOSITORY,
    MUSCLE_REPOSITORY,
    EQUIPMENT_REPOSITORY,
    MOVIMENT_REPOSITORY,
  ],
})
export class DatasourceModule {}
