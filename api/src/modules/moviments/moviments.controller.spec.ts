import { Test, TestingModule } from '@nestjs/testing';
import { MovimentsController } from './moviments.controller';
import { MovimentsService } from './moviments.service';
import {
  MOVIMENT_REPOSITORY,
  ID_GENERATOR,
  MUSCLE_REPOSITORY,
} from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { MusclesRepositoryMemory } from '../muscles/repositories/muscles.repository.memory';
import { MovimentRepositoryMemory } from './repositories/moviments.repository.memory';

describe('MovimentsController', () => {
  let controller: MovimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentsController],
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

    controller = module.get<MovimentsController>(MovimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
