import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ID_GENERATOR,
  TRAINING_REPOSITORY,
  WEEK_PLAN_REPOSITORY,
} from '../../../constants/tokens';
import { IdGenerator } from '../../core/IdGenerator/IdGenerator';
import { WeekPlan } from './entities/week-plan.entity';
import { TrainingsRepository } from '../trainings/repositories/trainings.repository';
import { WeekPlanRepository } from './repositories/week-plan.repository';
import { WeekPlanTraining } from './entities/week-plan-training.entity';

type AddTrainingParams = {
  weekPlanId: string;
  trainingId: string;
};

type RemoveTrainingParams = {
  weekPlanId: string;
  day: string;
};

type SwapTrainingsParams = {
  weekPlanId: string;
  day1: string;
  day2: string;
};

@Injectable()
export class WeekPlansService {
  constructor(
    @Inject(WEEK_PLAN_REPOSITORY)
    private weekPlanRepository: WeekPlanRepository,
    @Inject(TRAINING_REPOSITORY)
    private trainingRepository: TrainingsRepository,
    @Inject(ID_GENERATOR) private idGenerator: IdGenerator,
  ) {}

  async create() {
    const id = this.idGenerator.generate();
    const weekPlan = new WeekPlan(id);
    await this.weekPlanRepository.create(weekPlan);
    return {
      id,
    };
  }

  async addTraining({ trainingId, weekPlanId }: AddTrainingParams) {
    const weekPlan = await this.weekPlanRepository.findById(weekPlanId);
    if (!weekPlan) {
      throw new NotFoundException('WEEK_PLAN_NOT_FOUND');
    }
    const training = await this.trainingRepository.findById(trainingId);
    if (!training) {
      throw new NotFoundException('TRAINING_NOT_FOUND');
    }
    const id = this.idGenerator.generate();
    weekPlan.addTraining(new WeekPlanTraining(id, training.id));
    await this.weekPlanRepository.update(weekPlan);
  }

  async removeTraining({ weekPlanId, day }: RemoveTrainingParams) {
    const weekPlan = await this.weekPlanRepository.findById(weekPlanId);
    if (!weekPlan) {
      throw new NotFoundException('WEEK_PLAN_NOT_FOUND');
    }
    weekPlan.removeTraining(day);
    await this.weekPlanRepository.update(weekPlan);
  }

  async swapTrainings({ weekPlanId, day1, day2 }: SwapTrainingsParams) {
    const weekPlan = await this.weekPlanRepository.findById(weekPlanId);
    if (!weekPlan) {
      throw new NotFoundException('WEEK_PLAN_NOT_FOUND');
    }
    weekPlan.swapTrainings(day1, day2);
    await this.weekPlanRepository.update(weekPlan);
  }

  async findById(id: string) {
    const weekPlan = await this.weekPlanRepository.findById(id);
    if (!weekPlan) {
      throw new NotFoundException('WEEK_PLAN_NOT_FOUND');
    }
    return weekPlan.toJSON();
  }

  async findAll() {
    const weekPlans = await this.weekPlanRepository.findAll();
    return weekPlans.map((weekPlan) => weekPlan.toJSON());
  }
}
