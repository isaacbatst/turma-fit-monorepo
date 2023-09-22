import { Test, TestingModule } from '@nestjs/testing';
import { MovimentsService } from './moviments.service';
import { MovimentRepositoryMemory } from './repositories/moviments.repository.memory';
import {
  ID_GENERATOR,
  MOVIMENT_REPOSITORY,
  MUSCLE_REPOSITORY,
} from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { MusclesRepositoryMemory } from '../muscles/repositories/muscles.repository.memory';
import { Muscle } from '../muscles/entities/muscle.entity';

describe('MovimentsService', () => {
  let service: MovimentsService;
  let movimentRepository: MovimentRepositoryMemory;
  let muscleRepository: MusclesRepositoryMemory;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimentsService,
        {
          provide: MOVIMENT_REPOSITORY,
          useClass: MovimentRepositoryMemory,
        },
        {
          provide: ID_GENERATOR,
          useClass: IdGeneratorFake,
        },
        {
          provide: MUSCLE_REPOSITORY,
          useClass: MusclesRepositoryMemory,
        },
      ],
    }).compile();

    movimentRepository =
      module.get<MovimentRepositoryMemory>(MOVIMENT_REPOSITORY);
    muscleRepository = module.get<MusclesRepositoryMemory>(MUSCLE_REPOSITORY);
    service = module.get<MovimentsService>(MovimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should persist created moviment', async () => {
    await muscleRepository.create(new Muscle('muscle-id', 'muscle'));
    const moviment = await service.create({
      name: 'moviment',
      muscleId: 'muscle-id',
    });
    expect(moviment.id).toBeDefined();
    expect(movimentRepository.items).toHaveLength(1);
    expect(movimentRepository.items[0].id).toBe(moviment.id);
  });

  it('should list all moviments', async () => {
    await muscleRepository.create(new Muscle('muscle-id', 'muscle'));
    await service.create({
      name: 'moviment',
      muscleId: 'muscle-id',
    });
    const moviments = await service.findAll();
    expect(moviments).toHaveLength(1);
    expect(moviments[0].name).toBe('moviment');
  });
});
