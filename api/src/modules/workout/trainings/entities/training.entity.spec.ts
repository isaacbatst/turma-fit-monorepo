import { Equipment } from '../../equipments/entities/equipment.entity';
import { Moviment } from '../../moviments/entities/moviment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Exercise } from './exercise.entity';
import { Training } from './training.entity';

describe('Training', () => {
  let benchPressExercise: Exercise;
  let barbellCurlExercise: Exercise;
  let barbellBarExercise: Exercise;

  beforeEach(() => {
    const chest = new Muscle('chest-id', 'Chest');
    const bisceps = new Muscle('biceps-id', 'Biceps');
    const benchPress = new Moviment('bench-press-id', 'Bench Press', chest);
    const barbellCurl = new Moviment(
      'barbell-curl-id',
      'Barbell Curl',
      bisceps,
    );
    const bar = new Equipment('bar-id', 'Bar');
    const curlBar = new Equipment('curl-bar-id', 'Curl Bar');
    benchPressExercise = new Exercise('id', benchPress, bar);
    barbellCurlExercise = new Exercise('id', barbellCurl, curlBar);
    barbellBarExercise = new Exercise('id', barbellCurl, bar);
  });

  it('should create empty training', () => {
    const training = new Training('training-id');
    expect(training).toBeDefined();
    expect(training.getExerciseSets()).toHaveLength(0);
  });

  it('should add sets', () => {
    const training = new Training('training-id');
    training.addExerciseSet('set-id', benchPressExercise, 3, 10);
    training.addExerciseSet('set-id-2', barbellCurlExercise, 3, 10);

    expect(training.getExerciseSets()).toHaveLength(2);
  });

  it('should get trained muscles', () => {
    const training = new Training('training-id');
    training.addExerciseSet('id', benchPressExercise, 3, 10);
    training.addExerciseSet('id-2', barbellCurlExercise, 3, 10);

    const muscles = training.getMuscles();
    expect(muscles).toHaveLength(2);
    expect(muscles[0].name).toBe('Chest');
    expect(muscles[1].name).toBe('Biceps');
  });

  it('should get exercise sets by order', () => {
    const training = new Training('training-id');
    training.addExerciseSet('bench-id', benchPressExercise, 3, 10);
    training.addExerciseSet('barbell-id', barbellCurlExercise, 3, 10);

    expect(training.getExerciseSetByOrder(1)?.id).toBe('bench-id');
    expect(training.getExerciseSetByOrder(2)?.id).toBe('barbell-id');
  });

  it('should change exercise set order', () => {
    const training = new Training('training-id');
    training.addExerciseSet('bench-id', benchPressExercise, 3, 10);
    training.addExerciseSet('barbell-id', barbellCurlExercise, 3, 10);
    training.addExerciseSet('bar-id', barbellBarExercise, 3, 10);

    training.changeExerciseSetOrder('bench-id', 3);
    expect(training.getExerciseSetByOrder(1)?.id).toBe('barbell-id');
    expect(training.getExerciseSetByOrder(2)?.id).toBe('bar-id');
    expect(training.getExerciseSetByOrder(3)?.id).toBe('bench-id');
  });

  it('should remove exercise set', () => {
    const training = new Training('training-id');
    training.addExerciseSet('bench-id', benchPressExercise, 3, 10);
    training.addExerciseSet('barbell-id', barbellCurlExercise, 3, 10);
    training.addExerciseSet('bar-id', barbellBarExercise, 3, 10);
    training.removeExerciseSet('barbell-id');
    expect(training.getExerciseSets()).toHaveLength(2);
    expect(training.getExerciseSetByOrder(1)?.id).toBe('bench-id');
    expect(training.getExerciseSetByOrder(2)?.id).toBe('bar-id');
  });
});
