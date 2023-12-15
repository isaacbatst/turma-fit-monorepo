import { Serializable } from '@/common/types/Serializable';
import { MuscleSerialized } from './muscle.serialized';

export class Muscle implements Serializable<MuscleSerialized> {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
