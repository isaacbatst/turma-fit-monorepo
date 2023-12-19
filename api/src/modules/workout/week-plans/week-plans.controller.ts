import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { WeekPlansService } from './week-plans.service';
import { AddTrainingDto } from './dtos/add-training.dto';
import { RemoveTrainingDto } from './dtos/remove-training.dto';

@Controller('week-plans')
export class WeekPlansController {
  constructor(private weekPlansService: WeekPlansService) {}

  @Get('/')
  async findAll() {
    const weekPlans = await this.weekPlansService.findAll();
    return weekPlans;
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const weekPlan = await this.weekPlansService.findById(id);
    return weekPlan;
  }

  @Post('/')
  async create() {
    const { id } = await this.weekPlansService.create();
    return {
      id,
    };
  }

  @Post('/:id/trainings')
  async addTraining(@Param('id') id: string, @Body() body: AddTrainingDto) {
    const { id: weekPlanTrainingId } = await this.weekPlansService.addTraining({
      trainingId: body.trainingId,
      weekPlanId: id,
    });

    return {
      id: weekPlanTrainingId,
    };
  }

  @HttpCode(204)
  @Delete('/:id/trainings')
  async removeTraining(
    @Param('id') id: string,
    @Body() body: RemoveTrainingDto,
  ) {
    await this.weekPlansService.removeTraining({
      day: body.day,
      weekPlanId: id,
    });
  }
}
