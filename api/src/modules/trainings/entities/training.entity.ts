import { Exercise } from './exercise.entity';
import { ExerciseSet as ExerciseSet } from './exercise-set.entity';

export class Training {
  readonly exerciseSets: ExerciseSet[] = [];

  constructor(
    readonly id: string,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {}

  addExerciseSet(
    setId: string,
    exercise: Exercise | Exercise[],
    series: number,
    repetitions: number,
    restTime?: number,
  ): ExerciseSet {
    const set = new ExerciseSet(setId, exercise, series, repetitions, restTime);
    this.exerciseSets.push(set);
    return set;
  }

  getMuscles() {
    return this.exerciseSets
      .map((exerciseSet) => exerciseSet.exercises)
      .flat()
      .map((exercise) => exercise.moviment.muscle)
      .filter(
        (muscle, index, muscles) =>
          muscles.findIndex((m) => m.id === muscle.id) === index,
      );
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      muscles: this.getMuscles().map((muscle) => muscle.toJSON()),
      exerciseSets: this.exerciseSets.map((exerciseSet) =>
        exerciseSet.toJSON(),
      ),
    };
  }
}
