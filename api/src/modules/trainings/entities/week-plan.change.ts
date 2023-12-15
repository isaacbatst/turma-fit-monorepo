export type WeekPlanChangeAddTraining = {
  type: 'add-training';
  trainingId: string;
};

export type WeekPlanChangeRemoveTraining = {
  type: 'remove-training';
  trainingId: string;
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
