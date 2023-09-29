import { Test, TestingModule } from '@nestjs/testing';
import { WeekPlanningService } from './week-planning.service';

describe('WeekPlanningService', () => {
  let service: WeekPlanningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeekPlanningService],
    }).compile();

    service = module.get<WeekPlanningService>(WeekPlanningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
