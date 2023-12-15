import { ExerciseSerialized } from './exercise.serialized';

export type ExerciseSetSerialized = {
  id: string;
  exercises: ExerciseSerialized[];
  sets: number;
  repetitions: number;
  restTime?: number;
  order: number;
  name: string;
};
