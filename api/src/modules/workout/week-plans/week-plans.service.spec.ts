import { Test, TestingModule } from '@nestjs/testing';
import {
  ID_GENERATOR,
  TRAINING_REPOSITORY,
  WEEK_PLAN_REPOSITORY,
} from '../../../constants/tokens';
import { IdGeneratorFake } from '../../core/IdGenerator/IdGeneratorFake';
import { TrainingsRepositoryMemory } from '../trainings/repositories/trainings.repository.memory';
import { WeekPlanRepositoryMemory } from './repositories/week-plan.repository.memory';
import { WeekPlansService } from './week-plans.service';
import { Training } from '../trainings/entities/training.entity';

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

    await trainingRepository.create(new Training('any-training-id'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should persist created week plan', async () => {
      await service.create();
      expect(weekPlanRepository.items.length).toBe(1);
      expect(weekPlanRepository.items[0].id).toBe(idGenerator.id);
    });
  });

  describe('addTraining', () => {
    it('should add training to week plan', async () => {
      const { id } = await service.create();
      await service.addTraining({
        trainingId: 'any-training-id',
        weekPlanId: id,
      });
      const weekPlan = await weekPlanRepository.findById(id);
      expect(weekPlan!.getTrainingByDay('A')).toBeDefined();
    });

    it('should throw an error when trying to add a training to a week plan that does not exist', async () => {
      await expect(
        service.addTraining({
          trainingId: 'any-training-id',
          weekPlanId: 'not-found-week-plan-id',
        }),
      ).rejects.toThrowError('WEEK_PLAN_NOT_FOUND');
    });

    it('should throw an error when trying to add a training that does not exist', async () => {
      const { id } = await service.create();
      await expect(
        service.addTraining({
          trainingId: 'not-found-training-id',
          weekPlanId: id,
        }),
      ).rejects.toThrowError('TRAINING_NOT_FOUND');
    });
  });

  describe('removeTraining', () => {
    it('should remove training from week plan', async () => {
      const { id } = await service.create();
      await service.addTraining({
        trainingId: 'any-training-id',
        weekPlanId: id,
      });
      await service.removeTraining({
        weekPlanId: id,
        day: 'A',
      });
      const weekPlan = await weekPlanRepository.findById(id);
      expect(weekPlan!.getTrainingByDay('A')).toBeUndefined();
    });
  });

  describe('swapTrainings', () => {
    it('should swap trainings', async () => {
      await trainingRepository.create(new Training('a-training-id'));
      await trainingRepository.create(new Training('b-training-id'));

      const { id } = await service.create();
      idGenerator.setNextId('a-week-training-id');
      await service.addTraining({
        trainingId: 'a-training-id',
        weekPlanId: id,
      });
      idGenerator.setNextId('b-week-training-id');
      await service.addTraining({
        trainingId: 'b-training-id',
        weekPlanId: id,
      });
      await service.swapTrainings({
        weekPlanId: id,
        day1: 'B',
        day2: 'A',
      });
      const weekPlan = await weekPlanRepository.findById(id);
      expect(weekPlan!.getTrainingByDay('A')!.id).toBe('b-week-training-id');
      expect(weekPlan!.getTrainingByDay('B')!.id).toBe('a-week-training-id');
    });
  });

  describe('findById', () => {
    it('should return week plan', async () => {
      const { id } = await service.create();
      const weekPlan = await service.findById(id);
      expect(weekPlan.id).toBe(id);
    });
  });

  describe('findAll', () => {
    it('should return all week plans', async () => {
      const { id } = await service.create();
      const weekPlans = await service.findAll();
      expect(weekPlans).toHaveLength(1);
      expect(weekPlans[0].id).toBe(id);
    });
  });
});
