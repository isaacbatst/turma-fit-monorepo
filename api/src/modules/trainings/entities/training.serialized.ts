import { OrderedListSerialized } from '../../core/ordered-list.serialized';
import { MuscleSerialized } from '../../muscles/entities/muscle.serialized';
import { ExerciseSetSerialized } from './exercise-set.serialized';

export type TrainingSerialized = {
  id: string;
  createdAt: string;
  updatedAt: string;
  muscles: MuscleSerialized[];
  exerciseSets: OrderedListSerialized<ExerciseSetSerialized>;
};
