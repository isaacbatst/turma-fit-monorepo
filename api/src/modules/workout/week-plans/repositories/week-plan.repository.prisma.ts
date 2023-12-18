import { NotFoundException } from '@nestjs/common';
import { PrismaErrorAdapter } from '../../../../common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '../../../../common/repositories/repository.prisma';
import { WeekPlan } from '../entities/week-plan.entity';
import { WeekPlanTraining } from '../entities/week-plan-training.entity';
import {
  WeekPlan as WeekPlanPrisma,
  WeekPlanTraining as WeekPlanTrainingPrisma,
} from '@prisma/client';

type WeekPlanPrismaComplete = WeekPlanPrisma & {
  weekPlanTrainings: WeekPlanTrainingPrisma[];
};

export class WeekPlanRepositoryPrisma extends RepositoryPrisma<WeekPlan> {
  errorAdapter: PrismaErrorAdapter = new PrismaErrorAdapter('week_plan');

  static toEntity(data: WeekPlanPrismaComplete): WeekPlan {
    const trainings = data.weekPlanTrainings
      .sort((a, b) => a.order - b.order)
      .map(
        (training) =>
          new WeekPlanTraining(
            training.trainingId,
            training.createdAt,
            training.updatedAt,
          ),
      );
    const plan = new WeekPlan(
      data.id,
      data.createdAt,
      data.updatedAt,
      trainings,
    );
    return plan;
  }

  protected async unhandledCreate(item: WeekPlan): Promise<void> {
    await this.prisma.weekPlan.create({
      data: {
        id: item.id,
        createdAt: item.getCreatedAt(),
        updatedAt: item.getUpdatedAt(),
      },
    });
  }
  protected async unhandledFindAll(): Promise<WeekPlan[]> {
    const weekPlans = await this.prisma.weekPlan.findMany({
      include: {
        weekPlanTrainings: true,
      },
    });

    return weekPlans.map(WeekPlanRepositoryPrisma.toEntity);
  }
  protected async unhandledFindById(id: string): Promise<WeekPlan | undefined> {
    const weekPlan = await this.prisma.weekPlan.findUnique({
      include: {
        weekPlanTrainings: true,
      },
      where: { id },
    });

    if (!weekPlan) return undefined;
    return WeekPlanRepositoryPrisma.toEntity(weekPlan);
  }
  protected async unhandledUpdate(updated: WeekPlan): Promise<void> {
    updated.changes.map(async (change) => {
      if (change.type === 'add-training') {
        const found = updated.getTrainingById(change.trainingId);
        if (!found) throw new NotFoundException('TRAINING_NOT_FOUND');
        const { item: training, order } = found;
        await this.prisma.weekPlanTraining.create({
          data: {
            trainingId: change.trainingId,
            weekPlanId: updated.getId(),
            order,
            createdAt: training.createdAt,
            updatedAt: training.getUpdatedAt(),
          },
        });
      }
    });

    await this.prisma.weekPlan.update({
      where: { id: updated.getId() },
      data: {
        updatedAt: updated.getUpdatedAt(),
      },
    });
  }
  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.weekPlan.delete({ where: { id } });
  }
}
