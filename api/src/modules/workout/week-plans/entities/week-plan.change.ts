import { WeekPlanTraining } from './week-plan-training.entity';

export type WeekPlanChangeAddTraining = {
  type: 'add-training';
  training: {
    data: WeekPlanTraining;
    order: number;
  };
};

export type WeekPlanChangeRemoveTraining = {
  type: 'remove-training';
  training: {
    data: WeekPlanTraining;
    order: number;
  };
};

export type WeekPlanChangeSwapTraining = {
  type: 'swap-training';
  day1: string;
  day2: string;
};

export type WeekPlanChange =
  | WeekPlanChangeAddTraining
  | WeekPlanChangeRemoveTraining
  | WeekPlanChangeSwapTraining;
