import { Equipment } from "./Equipment";
import { Grip } from "./Grip";
import { Moviment } from "./Moviment";
import { Muscle } from "./Muscle";

export type Training = {
  id: string;
  createdAt: string;
  updatedAt: string;
  muscles: Muscle[];
  exerciseSets: {
    id: string;
    sets: number;
    repetitions: number;
    restTime: number | undefined;
    exercises: {
        moviment: Moviment;
        equipments: Equipment[];
        grip: Grip | undefined;
    }[];
  }[]
}