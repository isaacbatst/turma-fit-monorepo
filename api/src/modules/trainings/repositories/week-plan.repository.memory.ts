import { RepositoryMemory } from '../../../common/repositories/repository.memory';
import { WeekPlan } from '../entities/week-plan.entity';
import { WeekPlanRepository } from './week-plan.repository';

export class WeekPlanRepositoryMemory
  extends RepositoryMemory<WeekPlan>
  implements WeekPlanRepository {}
