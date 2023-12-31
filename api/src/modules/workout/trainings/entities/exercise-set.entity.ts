import { UnprocessableEntityException } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { gripToFriendlyName } from './grip.enum';
import { Serializable } from '@/common/types/Serializable';
import { ExerciseSetSerialized } from './exercise-set.serialized';

export class ExerciseSet implements Serializable<ExerciseSetSerialized> {
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

  getMuscles() {
    return this.exercises.map((exercise) => exercise.moviment.muscle);
  }

  toString() {
    return this.exercises
      .map((exercise) => {
        const exerciseName = `${exercise.moviment.name}${
          exercise.grip ? ` ${gripToFriendlyName(exercise.grip)}` : ''
        }`;
        const equipmentNames = exercise.equipments
          .map((equipment) => equipment.name)
          .join(' ou ');
        return `${exerciseName} ${equipmentNames}`;
      })
      .join(' + ');
  }

  toJSON() {
    return {
      id: this.id,
      exercises: this.exercises.map((exercise) => exercise.toJSON()),
      sets: this.sets,
      repetitions: this.repetitions,
      restTime: this.restTime,
      name: this.toString(),
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
