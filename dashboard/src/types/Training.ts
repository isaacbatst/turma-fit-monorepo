import { Equipment } from "./Equipment";
import { Grip } from "./Grip";
import { Moviment } from "./Moviment";
import { Muscle } from "./Muscle";

export type Exercise = {
  id: string;
  moviment: Moviment;
  equipments: Equipment[];
  grip: Grip | undefined;
}

export type ExerciseSet = {
  id: string;
  sets: number;
  repetitions: number;
  restTime: number | undefined;
  order: number;
  exercises: Exercise[];
  name: string;
}

export type Training = {
  id: string;
  createdAt: string;
  updatedAt: string;
  muscles: Muscle[];
  exerciseSets: ExerciseSet[]
}