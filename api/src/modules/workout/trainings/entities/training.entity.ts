import { Serializable } from '@/common/types/Serializable';
import { OrderedList } from '@/modules/core/ordered-list';
import { ExerciseSet } from './exercise-set.entity';
import { ExerciseSetSerialized } from './exercise-set.serialized';
import { Exercise } from './exercise.entity';
import { TrainingSerialized } from './training.serialized';

export class Training implements Serializable<TrainingSerialized> {
  private readonly exerciseSets = new OrderedList<
    ExerciseSet,
    ExerciseSetSerialized
  >([], 'EXERCISE_SET_NOT_FOUND');

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
  ): [ExerciseSet, number] {
    const set = new ExerciseSet(setId, exercise, series, repetitions, restTime);
    const nextOrder = this.exerciseSets.add(set);
    return [set, nextOrder];
  }

  removeExerciseSet(setId: string) {
    this.exerciseSets.delete(setId);
  }

  getExerciseSets() {
    return this.exerciseSets.getItems();
  }

  changeExerciseSetOrder(setId: string, newOrder: number) {
    this.exerciseSets.changeOrder(setId, newOrder);
  }

  getExerciseSetByOrder(order: number): ExerciseSet | undefined {
    return this.exerciseSets.getByOrder(order);
  }

  getExerciseSetOrder(setId: string) {
    return this.exerciseSets.getItemOrder(setId);
  }

  getMuscles() {
    return this.exerciseSets
      .getItems()
      .map((exerciseSet) => exerciseSet.data.getMuscles())
      .flat()
      .filter(
        (muscle, index, muscles) =>
          muscles.findIndex((m) => m.id === muscle.id) === index,
      );
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      muscles: this.getMuscles().map((muscle) => muscle.toJSON()),
      exerciseSets: this.exerciseSets.toJSON(),
    };
  }
}
