import { Moviment } from "@/types/Moviment";

export type ApiGatewayMoviment = {
  createMoviment(name: string, muscleId: string): Promise<void>;
  editMoviment(id: string, name: string, muscleId: string): Promise<void>;
  deleteMoviment(id: string): Promise<void>;
  getMoviments(): Promise<Moviment[]>;
}