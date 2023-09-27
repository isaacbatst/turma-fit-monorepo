import { Equipment } from '../../equipments/entities/equipment.entity';
import { Moviment } from '../../moviments/entities/moviment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Exercise } from './exercise.entity';
import { Training } from './training.entity';

describe('Training', () => {
  it('should create empty training', () => {
    const training = new Training('training-id');
    expect(training).toBeDefined();
    expect(training.exerciseSets).toHaveLength(0);
  });

  it('should add sets', () => {
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
    const benchPressExercise = new Exercise('id', benchPress, bar);
    const barbellCurlExercise = new Exercise('id', barbellCurl, curlBar);

    const training = new Training('training-id');
    training.addExerciseSet('set-id', benchPressExercise, 3, 10);
    training.addExerciseSet('set-id', barbellCurlExercise, 3, 10);

    expect(training.exerciseSets).toHaveLength(2);
  });

  it('should get trained muscles', () => {
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
    const benchPressExercise = new Exercise('id', benchPress, bar);
    const barbellCurlExercise = new Exercise('id', barbellCurl, curlBar);

    const training = new Training('training-id');
    training.addExerciseSet('id', benchPressExercise, 3, 10);
    training.addExerciseSet('id', barbellCurlExercise, 3, 10);

    const muscles = training.getMuscles();
    expect(muscles).toHaveLength(2);
    expect(muscles[0].name).toBe('Chest');
    expect(muscles[1].name).toBe('Biceps');
  });
});
