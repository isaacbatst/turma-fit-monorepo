import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import {
  TRAINING_REPOSITORY,
  ID_GENERATOR,
  MOVIMENT_REPOSITORY,
  EQUIPMENT_REPOSITORY,
} from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { TrainingsRepositoryMemory } from './repositories/trainings.repository.memory';
import { MovimentRepositoryMemory } from '../moviments/repositories/moviments.repository.memory';
import { EquipmentsRepositoryMemory } from '../equipments/repositories/equipments.repository.memory';

describe('TrainingsController', () => {
  let controller: TrainingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingsController],
      providers: [
        TrainingsService,
        { useClass: TrainingsRepositoryMemory, provide: TRAINING_REPOSITORY },
        { useClass: MovimentRepositoryMemory, provide: MOVIMENT_REPOSITORY },
        { useClass: EquipmentsRepositoryMemory, provide: EQUIPMENT_REPOSITORY },
        { useClass: IdGeneratorFake, provide: ID_GENERATOR },
      ],
    }).compile();

    controller = module.get<TrainingsController>(TrainingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
