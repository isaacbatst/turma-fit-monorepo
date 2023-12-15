import { Test, TestingModule } from '@nestjs/testing';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';
import { MUSCLE_REPOSITORY, ID_GENERATOR } from '@/constants/tokens';
import { IdGeneratorFake } from '@/modules/core/IdGenerator/IdGeneratorFake';
import { MusclesRepositoryMemory } from './repositories/muscles.repository.memory';

describe('MusclesController', () => {
  let controller: MusclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusclesController],
      providers: [
        MusclesService,
        { provide: MUSCLE_REPOSITORY, useValue: new MusclesRepositoryMemory() },
        { provide: ID_GENERATOR, useValue: new IdGeneratorFake() },
      ],
    }).compile();

    controller = module.get<MusclesController>(MusclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
