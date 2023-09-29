import { Test, TestingModule } from '@nestjs/testing';
import {
  EQUIPMENT_REPOSITORY,
  ID_GENERATOR,
  MOVIMENT_REPOSITORY,
  TRAINING_REPOSITORY,
} from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { EquipmentsRepositoryMemory } from '../equipments/repositories/equipments.repository.memory';
import { Moviment } from '../moviments/entities/moviment.entity';
import { MovimentRepositoryMemory } from '../moviments/repositories/moviments.repository.memory';
import { Muscle } from '../muscles/entities/muscle.entity';
import { TrainingsRepositoryMemory } from './repositories/trainings.repository.memory';
import { TrainingsService } from './trainings.service';

describe('TrainingsService', () => {
  let service: TrainingsService;
  let trainingRepository: TrainingsRepositoryMemory;
  let movimentRepository: MovimentRepositoryMemory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingsService,
        { useClass: TrainingsRepositoryMemory, provide: TRAINING_REPOSITORY },
        { useClass: MovimentRepositoryMemory, provide: MOVIMENT_REPOSITORY },
        { useClass: EquipmentsRepositoryMemory, provide: EQUIPMENT_REPOSITORY },
        { useClass: IdGeneratorFake, provide: ID_GENERATOR },
      ],
    }).compile();

    trainingRepository =
      module.get<TrainingsRepositoryMemory>(TRAINING_REPOSITORY);
    movimentRepository =
      module.get<MovimentRepositoryMemory>(MOVIMENT_REPOSITORY);
    service = module.get<TrainingsService>(TrainingsService);

    const peitoral = new Muscle('peitoral', 'Peitoral');
    const supinoReto = new Moviment('supino-reto', 'Supino Reto', peitoral);
    const crucifixoReto = new Moviment('crucifixo-reto', 'Crucifixo', peitoral);
    movimentRepository.create(supinoReto);
    movimentRepository.create(crucifixoReto);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should persist training', async () => {
    await service.create();
    expect(trainingRepository.items).toHaveLength(1);
  });

  it('should add exercise to training', async () => {
    const training = await service.create();
    await service.addExerciseSet(training.id, {
      exercise: {
        movimentId: 'supino-reto',
        equipmentIds: ['barra-reta'],
      },
      repetitions: 10,
      sets: 3,
    });
    expect(trainingRepository.items[0].getExerciseSets()).toHaveLength(1);
  });

  it('should return all trainings', async () => {
    await service.create();
    const trainings = await service.findAll();
    expect(trainings).toHaveLength(1);
  });

  it('should change exercise set order', async () => {
    const { id: trainingId } = await service.create();
    const { id: firstId } = await service.addExerciseSet(trainingId, {
      exercise: {
        movimentId: 'supino-reto',
        equipmentIds: ['barra-reta'],
      },
      repetitions: 10,
      sets: 3,
    });
    const { id: secondId } = await service.addExerciseSet(trainingId, {
      exercise: {
        movimentId: 'crucifixo-reto',
        equipmentIds: ['halteres'],
      },
      repetitions: 10,
      sets: 3,
    });
    await service.changeExerciseSetOrder(trainingId, firstId, 2);
    const training = trainingRepository.items[0];
    expect(training.getExerciseByOrder(2)?.id).toBe(firstId);
    expect(training.getExerciseByOrder(1)?.id).toBe(secondId);
  });
});
