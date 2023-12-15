import { Moviment } from '../../moviments/entities/moviment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Exercise } from './exercise.entity';
import { ExerciseSet } from './exercise-set.entity';

describe('Set', () => {
  let muscle: Muscle;
  let moviment: Moviment;
  let exercise: Exercise;

  beforeEach(() => {
    muscle = new Muscle('muscle-id', 'muscle-name');
    moviment = new Moviment('moviment-id', 'moviment-name', muscle);
    exercise = new Exercise(moviment);
  });

  it('should have an exercise list', () => {
    const set = new ExerciseSet('id', [exercise]);
    expect(set.exercises).toHaveLength(1);
  });

  it('should have repetitions and series', () => {
    const set = new ExerciseSet('id', [exercise], 3, 10);
    expect(set.repetitions).toBe(10);
    expect(set.sets).toBe(3);
  });

  it('should throw with 0 repetitions', () => {
    expect(() => new ExerciseSet('id', [exercise], 3, 0)).toThrow();
  });

  it('should throw with negative repetitions', () => {
    expect(() => new ExerciseSet('id', [exercise], 3, -1)).toThrow();
  });

  it('should throw with 0 series', () => {
    expect(() => new ExerciseSet('id', [exercise], 0, 10)).toThrow();
  });

  it('should throw with negative series', () => {
    expect(() => new ExerciseSet('id', [exercise], -1, 10)).toThrow();
  });

  it('should have multiple exercises', () => {
    const movimentB = new Moviment('moviment-b-id', 'moviment-b-name', muscle);
    const exerciseB = new Exercise(movimentB);
    const set = new ExerciseSet('id', [exercise, exerciseB]);
    expect(set.exercises).toHaveLength(2);
  });
});
