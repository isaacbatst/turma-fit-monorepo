import { WeekPlan } from '../entities/week-plan.entity';
import { WeekPlanChange } from '../week-plan-change';

export type WeekPlanRepository = {
  create(item: WeekPlan): Promise<void>;
  findAll(): Promise<WeekPlan[]>;
  findById(id: string): Promise<WeekPlan | undefined>;
  update(updated: WeekPlan, ...changes: WeekPlanChange[]): Promise<void>;
  remove(id: string): Promise<void>;
};
