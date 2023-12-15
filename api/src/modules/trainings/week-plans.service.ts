import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ID_GENERATOR,
  TRAINING_REPOSITORY,
  WEEK_PLAN_REPOSITORY,
} from '../../constants/tokens';
import { IdGenerator } from '../core/IdGenerator/IdGenerator';
import { WeekPlan } from './entities/week-plan.entity';
import { WeekPlanRepository } from './repositories/week-plan.repository';
import { TrainingsRepository } from './repositories/trainings.repository';

type AddTrainingParams = {
  weekPlanId: string;
  trainingId: string;
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
    weekPlan.addTraining(training);
    await this.weekPlanRepository.update(weekPlan!);
  }
}
