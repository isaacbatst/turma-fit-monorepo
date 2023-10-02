import { Grip } from "@/types/Grip";
import { Training } from "@/types/Training";


export type AddExerciseSetParams = {
  trainingId: string;
  exercise: {
    movimentId: string;
    equipmentIds: string[];
    grip: Grip;
  }
  repetitions: number;
  sets: number;
}

export type ChangeExerciseSetOrderParams = {
  trainingId: string;
  exerciseSetId: string;
  order: number;
}

export type ApiGatewayTraining = {
  createTraining(): Promise<void>;
  addExerciseSet(params: AddExerciseSetParams): Promise<void>;
  getTrainings(): Promise<Training[]>;
  changeExerciseSetOrder(params: ChangeExerciseSetOrderParams): Promise<void>;
  removeExerciseSet(trainingId: string, exerciseSetId: string): Promise<void>;
}