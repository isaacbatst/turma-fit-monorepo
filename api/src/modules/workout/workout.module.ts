import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';
import { MovimentsModule } from './moviments/moviments.module';
import { MusclesModule } from './muscles/muscles.module';
import { TrainingsModule } from './trainings/trainings.module';
import { WeekPlansModule } from './week-plans/week-plans.module';

@Module({
  imports: [
    MusclesModule,
    EquipmentsModule,
    MovimentsModule,
    TrainingsModule,
    WeekPlansModule,
  ],
})
export class WorkoutModule {}
