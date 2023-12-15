import { Equipment } from '../../equipments/entities/equipment.entity';
import { Moviment } from '../../moviments/entities/moviment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Exercise } from './exercise.entity';
import { Grip } from './grip.enum';

describe('Exercise', () => {
  let moviment: Moviment;

  beforeEach(() => {
    moviment = new Moviment(
      'moviment-id',
      'moviment-name',
      new Muscle('muscle-id', 'muscle-name'),
    );
  });

  it('should have a moviment and an equipment', () => {
    const equipment = new Equipment('equipment-id', 'equipment-name');
    const exercise = new Exercise('id', moviment, equipment);
    expect(exercise.moviment).toBeDefined();
    expect(exercise.equipments).toBeDefined();
  });

  it('should have multiple equipments', () => {
    const equipmentA = new Equipment('equipment-a-id', 'equipment-a-name');
    const equipmentB = new Equipment('equipment-b-id', 'equipment-b-name');
    const exercise = new Exercise('id', moviment, [equipmentA, equipmentB]);
    expect(exercise.equipments).toHaveLength(2);
  });

  it('should have grip', () => {
    const equipment = new Equipment('equipment-id', 'equipment-name');
    const exercise = new Exercise('id', moviment, equipment, Grip.neutral);
    expect(exercise.grip).toBeDefined();
  });

  it('should print exercise name', () => {
    const equipment = new Equipment('equipment-id', 'equipment-name');
    const exercise = new Exercise('id', moviment, equipment);
    expect(exercise.toString()).toBe('moviment-name equipment-name');
  });

  it('should print exercise name with multiple equipments', () => {
    const equipmentA = new Equipment('equipment-a-id', 'equipment-a-name');
    const equipmentB = new Equipment('equipment-b-id', 'equipment-b-name');
    const exercise = new Exercise('id', moviment, [equipmentA, equipmentB]);
    expect(exercise.toString()).toBe(
      'moviment-name equipment-a-name ou equipment-b-name',
    );
  });

  it('should print exercise name with grip', () => {
    const equipment = new Equipment('equipment-id', 'equipment-name');
    const exercise = new Exercise('id', moviment, equipment, Grip.neutral);
    expect(exercise.toString()).toBe(
      'moviment-name equipment-name (Pegada Neutra)',
    );
  });
});
