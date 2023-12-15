import { OrderedListSerialized } from '../../../core/ordered-list.serialized';
import { TrainingSerialized } from '../../trainings/entities/training.serialized';

export type WeekPlanSerialized = {
  id: string;
  createdAt: string;
  updatedAt: string;
  trainings: OrderedListSerialized<
    TrainingSerialized & {
      letter: string;
    }
  >;
};
