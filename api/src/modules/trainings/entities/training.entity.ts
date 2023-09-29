import { OrderedList } from '../../core/ordered-list';
import { ExerciseSet } from './exercise-set.entity';
import { Exercise } from './exercise.entity';

export class Training {
  private readonly exerciseSets = new OrderedList<ExerciseSet>();

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
    order?: number,
  ): ExerciseSet {
    const set = new ExerciseSet(
      setId,
      exercise,
      series,
      repetitions,
      restTime,
      order ?? this.exerciseSets.getNextOrder(),
    );
    this.exerciseSets.add(set);
    return set;
  }

  getExerciseSets() {
    return this.exerciseSets.getItems();
  }

  changeExerciseSetOrder(setId: string, newOrder: number) {
    this.exerciseSets.changeOrder(setId, newOrder);
  }

  getExerciseByOrder(order: number): ExerciseSet | undefined {
    return this.exerciseSets.getByOrder(order);
  }

  getMuscles() {
    return this.exerciseSets
      .getItems()
      .map((exerciseSet) => exerciseSet.getMuscles())
      .flat()
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
      exerciseSets: this.exerciseSets
        .getItems()
        .map((exerciseSet) => exerciseSet.toJSON()),
    };
  }
}
