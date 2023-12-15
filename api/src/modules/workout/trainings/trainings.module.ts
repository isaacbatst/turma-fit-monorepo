import { Module } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { TrainingsController } from './trainings.controller';

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
