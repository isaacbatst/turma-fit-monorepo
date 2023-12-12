import { Serializable } from '../../../common/types/Serializable';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Moviment } from '../../moviments/entities/moviment.entity';
import { ExerciseSerialized } from './exercise.serialized';
import { Grip } from './grip.enum';

export class Exercise implements Serializable<ExerciseSerialized> {
  readonly equipments: Equipment[] = [];

  constructor(
    readonly id: string,
    readonly moviment: Moviment,
    equipment: Equipment | Equipment[] = [],
    readonly grip?: Grip,
  ) {
    this.equipments = Array.isArray(equipment) ? equipment : [equipment];
  }

  toString(): string {
    const equipmentsText =
      this.equipments.length > 0
        ? ` ${this.equipments.map((equipment) => equipment.name).join(' ou ')}`
        : '';

    const gripText = this.grip ? ` (${this.translateGrip(this.grip)})` : '';

    return `${this.moviment.name}${equipmentsText}${gripText}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.toString(),
      moviment: this.moviment.toJSON(),
      equipments: this.equipments.map((equipment) => equipment.toJSON()),
      grip: this.grip,
    };
  }

  private translateGrip(grip: Grip): string {
    switch (grip) {
      case Grip.neutral:
        return 'Pegada Neutra';
      case Grip.pronated:
        return 'Pronada';
      case Grip.supinated:
        return 'Supinada';
    }
  }
}
