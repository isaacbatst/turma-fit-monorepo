import { ExerciseSerialized } from './exercise.serialized';

export type ExerciseSetSerialized = {
  id: string;
  exercises: ExerciseSerialized[];
  sets: number;
  repetitions: number;
  restTime?: number;
  name: string;
};
