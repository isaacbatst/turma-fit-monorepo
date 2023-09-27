import { Muscle } from "@/types/Muscle";

export type ApiGatewayMuscles = {
  createMuscle(name: string): Promise<void>;
  editMuscle(id: string, name: string): Promise<void>;
  getMuscles(): Promise<Muscle[]>;
  deleteMuscle(id: string): Promise<void>;
}