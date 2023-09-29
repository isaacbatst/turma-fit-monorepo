import { Test, TestingModule } from '@nestjs/testing';
import { WeekPlanningController } from './week-planning.controller';
import { WeekPlanningService } from './week-planning.service';

describe('WeekPlanningController', () => {
  let controller: WeekPlanningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeekPlanningController],
      providers: [WeekPlanningService],
    }).compile();

    controller = module.get<WeekPlanningController>(WeekPlanningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
