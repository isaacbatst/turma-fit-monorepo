import { EquipmentSerialized } from '../../equipments/entities/equipment.serialized';
import { MovimentSerialized } from '../../moviments/entities/moviment.serialized';
import { Grip } from './grip.enum';

export type ExerciseSerialized = {
  id: string;
  name: string;
  moviment: MovimentSerialized;
  equipments: EquipmentSerialized[];
  grip?: Grip;
};
