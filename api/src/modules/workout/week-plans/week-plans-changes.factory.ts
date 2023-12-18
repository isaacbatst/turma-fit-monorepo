import { WeekPlanTraining } from './entities/week-plan-training.entity';
import { WeekPlanChange } from './week-plan-change';

export abstract class WeekPlansChangesFactory {
  abstract makeAddTrainingChange(
    training: WeekPlanTraining,
    order: number,
  ): WeekPlanChange;
  abstract makeRemoveTrainingChange(
    training: WeekPlanTraining,
    order: number,
  ): WeekPlanChange;
}
