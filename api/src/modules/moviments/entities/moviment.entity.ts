import { Muscle } from '../../muscles/entities/muscle.entity';

export class Moviment {
  readonly id: string;
  readonly name: string;
  muscle: Muscle;

  constructor(id: string, name: string, muscle: Muscle) {
    this.id = id;
    this.name = name;
    this.muscle = muscle;
  }

  getMuscle(): Muscle {
    return this.muscle;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      muscle: this.muscle.toJSON(),
    };
  }
}
