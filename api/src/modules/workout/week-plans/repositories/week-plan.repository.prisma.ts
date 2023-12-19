import {
  PrismaClient,
  WeekPlan as WeekPlanPrisma,
  WeekPlanTraining as WeekPlanTrainingPrisma,
} from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { PrismaErrorAdapter } from '../../../../common/adapters/prisma-errors.adapter';
import { RepositoryPrisma } from '../../../../common/repositories/repository.prisma';
import { WeekPlanTraining } from '../entities/week-plan-training.entity';
import {
  WeekPlanChangeAddTraining,
  WeekPlanChangeRemoveTraining,
} from '../entities/week-plan.change';
import { WeekPlan } from '../entities/week-plan.entity';

type WeekPlanPrismaComplete = WeekPlanPrisma & {
  weekPlanTrainings: WeekPlanTrainingPrisma[];
};

type PrismaTransaction = Omit<PrismaClient, ITXClientDenyList>;

export class WeekPlanRepositoryPrisma extends RepositoryPrisma<WeekPlan> {
  errorAdapter: PrismaErrorAdapter = new PrismaErrorAdapter('week_plan');

  static toEntity(data: WeekPlanPrismaComplete): WeekPlan {
    const trainings = data.weekPlanTrainings
      .sort((a, b) => a.order - b.order)
      .map(
        (training) =>
          new WeekPlanTraining(
            training.id,
            training.trainingId,
            training.createdAt,
            training.updatedAt,
          ),
      );
    const plan = new WeekPlan(data.id, data.createdAt, data.updatedAt);
    plan.restoreTrainings(trainings);
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
    await this.prisma.$transaction(async (transaction) => {
      const promises = updated.changes.map(async (change) => {
        if (change.type === 'add-training') {
          await this.addTraining(transaction, updated, change);
        }

        if (change.type === 'remove-training') {
          await this.removeTraining(transaction, updated, change);
        }
      });
      await Promise.all(promises);
      await transaction.weekPlan.update({
        where: { id: updated.getId() },
        data: {
          updatedAt: updated.getUpdatedAt(),
        },
      });
    });
  }
  protected async unhandledRemove(id: string): Promise<void> {
    await this.prisma.weekPlan.delete({ where: { id } });
  }

  private async addTraining(
    transaction: PrismaTransaction,
    weekPlan: WeekPlan,
    change: WeekPlanChangeAddTraining,
  ) {
    await transaction.weekPlanTraining.create({
      data: {
        weekPlanId: weekPlan.getId(),
        trainingId: change.training.data.trainingId,
        id: change.training.data.id,
        order: change.training.order,
        createdAt: change.training.data.createdAt,
        updatedAt: change.training.data.getUpdatedAt(),
      },
    });
  }

  private async removeTraining(
    transaction: PrismaTransaction,
    weekPlan: WeekPlan,
    change: WeekPlanChangeRemoveTraining,
  ) {
    await transaction.weekPlanTraining.delete({
      where: {
        id: change.training.data.id,
      },
    });

    await transaction.weekPlan.update({
      where: { id: weekPlan.getId() },
      data: {
        weekPlanTrainings: {
          updateMany: weekPlan.getTrainings().map((training) => ({
            data: {
              order: training.order,
              updatedAt: training.data.getUpdatedAt(),
            },
            where: {
              id: training.data.id,
            },
          })),
        },
      },
    });
  }
}
