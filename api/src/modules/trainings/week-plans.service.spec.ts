import { Test, TestingModule } from '@nestjs/testing';
import {
  ID_GENERATOR,
  TRAINING_REPOSITORY,
  WEEK_PLAN_REPOSITORY,
} from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { TrainingsRepositoryMemory } from './repositories/trainings.repository.memory';
import { WeekPlanRepositoryMemory } from './repositories/week-plan.repository.memory';
import { WeekPlansService } from './week-plans.service';
import { Training } from './entities/training.entity';

describe('WeekPlansService', () => {
  let service: WeekPlansService;
  let weekPlanRepository: WeekPlanRepositoryMemory;
  let trainingRepository: TrainingsRepositoryMemory;
  let idGenerator: IdGeneratorFake;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeekPlansService,
        { useClass: WeekPlanRepositoryMemory, provide: WEEK_PLAN_REPOSITORY },
        { useClass: TrainingsRepositoryMemory, provide: TRAINING_REPOSITORY },
        { useClass: IdGeneratorFake, provide: ID_GENERATOR },
      ],
    }).compile();

    weekPlanRepository =
      module.get<WeekPlanRepositoryMemory>(WEEK_PLAN_REPOSITORY);
    trainingRepository =
      module.get<TrainingsRepositoryMemory>(TRAINING_REPOSITORY);
    service = module.get<WeekPlansService>(WeekPlansService);
    idGenerator = module.get<IdGeneratorFake>(ID_GENERATOR);

    await trainingRepository.create(new Training('fake-training-id'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should persist created week plan', async () => {
    await service.create();
    expect(weekPlanRepository.items.length).toBe(1);
    expect(weekPlanRepository.items[0].id).toBe(idGenerator.id);
  });

  it('should add training to week plan', async () => {
    const { id } = await service.create();
    await service.addTraining({
      trainingId: 'fake-training-id',
      weekPlanId: id,
    });
    const weekPlan = await weekPlanRepository.findById(id);
    expect(weekPlan!.getTrainingByDay('A')).toBeDefined();
  });
});
