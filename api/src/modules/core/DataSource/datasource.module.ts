import { Module } from '@nestjs/common';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  EQUIPMENT_REPOSITORY,
  MOVIMENT_REPOSITORY,
  MUSCLE_REPOSITORY,
  PRISMA_SERVICE,
  TRAINING_REPOSITORY,
  WEEK_PLAN_REPOSITORY,
} from '@/constants/tokens';
import { AdminRepositoryPrisma } from '@/modules/admin/repositories/admin.repository.prisma';
import { AdminSessionRepositoryPrisma } from '@/modules/admin/repositories/admin.session.repository.prisma';
import { EquipmentsRepositoryPrisma } from '@/modules/workout/equipments/repositories/equipments.repository.prisma';
import { MovimentRepositoryPrisma } from '@/modules/workout/moviments/repositories/moviments.repository.prisma';
import { MusclesRepositoryPrisma } from '@/modules/workout/muscles/repositories/mucles.repository.prisma';
import { TrainingsRepositoryPrisma } from '@/modules/workout/trainings/repositories/trainings.repository.prisma';
import { PrismaService } from './prisma.service';
import { WeekPlanRepositoryPrisma } from '@/modules/workout/week-plans/repositories/week-plan.repository.prisma';

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
    {
      provide: TRAINING_REPOSITORY,
      useClass: TrainingsRepositoryPrisma,
    },
    {
      provide: WEEK_PLAN_REPOSITORY,
      useClass: WeekPlanRepositoryPrisma,
    },
  ],
  exports: [
    PRISMA_SERVICE,
    ADMIN_REPOSITORY,
    ADMIN_SESSION_REPOSITORY,
    MUSCLE_REPOSITORY,
    EQUIPMENT_REPOSITORY,
    MOVIMENT_REPOSITORY,
    TRAINING_REPOSITORY,
    WEEK_PLAN_REPOSITORY,
  ],
})
export class DatasourceModule {}
