import { Equipment } from "@/types/Equipment";

export type ApiGatewayEquipment = {
  createEquipment(name: string): Promise<void>;
  editEquipment(id: string, name: string): Promise<void>;
  deleteEquipment(id: string): Promise<void>;
  getEquipments(): Promise<Equipment[]>;
}