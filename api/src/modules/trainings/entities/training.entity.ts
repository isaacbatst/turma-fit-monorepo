import { Exercise } from './exercise.entity';
import { ExerciseSet as ExerciseSet } from './exercise-set.entity';

export class Training {
  constructor(
    readonly id: string,
    readonly exerciseSets: ExerciseSet[] = [],
  ) {}

  addExercise(
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
      .filter((muscle, index, muscles) => muscles.indexOf(muscle) === index);
  }

  toJSON() {
    return {
      id: this.id,
      exerciseSets: this.exerciseSets.map((exerciseSet) =>
        exerciseSet.toJSON(),
      ),
    };
  }
}
