import { Module } from '@nestjs/common';
import { WeekPlansService } from './week-plans.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WeekPlansService],
})
export class WeekPlansModule {}
