import { OrderedListSerialized } from '../../../core/ordered-list.serialized';
import { WeekPlanTrainingSerialized } from './week-plan-training.serialized';

export type WeekPlanSerialized = {
  id: string;
  createdAt: string;
  updatedAt: string;
  trainings: OrderedListSerialized<
    WeekPlanTrainingSerialized & {
      day: string;
    }
  >;
};
