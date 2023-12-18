import { Module } from '@nestjs/common';
import { WeekPlansService } from './week-plans.service';
import { WeekPlansController } from './week-plans.controller';

@Module({
  imports: [],
  controllers: [WeekPlansController],
  providers: [WeekPlansService],
})
export class WeekPlansModule {}
