import { UnprocessableEntityException } from '@nestjs/common';
import { Exercise } from './exercise.entity';

export class ExerciseSet {
  readonly exercises: Exercise[] = [];

  constructor(
    readonly id: string,
    exercise: Exercise | Exercise[],
    readonly sets: number = 3,
    readonly repetitions: number = 10,
    readonly restTime?: number,
  ) {
    this.exercises = Array.isArray(exercise) ? exercise : [exercise];
    this.validate();
  }

  toJSON() {
    return {
      id: this.id,
      exercises: this.exercises.map((exercise) => exercise.toJSON()),
      sets: this.sets,
      repetitions: this.repetitions,
      restTime: this.restTime,
    };
  }

  validate() {
    if (this.repetitions <= 0) {
      throw new UnprocessableEntityException('INVALID_REPETITIONS');
    }

    if (this.sets <= 0) {
      throw new UnprocessableEntityException('INVALID_SETS');
    }
  }
}
