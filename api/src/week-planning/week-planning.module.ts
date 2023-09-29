import { Module } from '@nestjs/common';
import { WeekPlanningService } from './week-planning.service';
import { WeekPlanningController } from './week-planning.controller';

@Module({
  controllers: [WeekPlanningController],
  providers: [WeekPlanningService],
})
export class WeekPlanningModule {}
