import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddExerciseDto } from './dto/add-exercise-dto';
import { TrainingsService } from './trainings.service';
import { ChangeExerciseSetOrderDto } from './dto/change-exercise-set-order-dto';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  create() {
    return this.trainingsService.create();
  }

  @HttpCode(201)
  @Post(':id/exercise-set')
  addExercise(@Param('id') id: string, @Body() body: AddExerciseDto) {
    return this.trainingsService.addExerciseSet(id, body);
  }

  @HttpCode(204)
  @Patch(':id/exercise-set/:exerciseSetId/order')
  changeExerciseSetOrder(
    @Param('id') id: string,
    @Param('exerciseSetId') exerciseSetId: string,
    @Body() body: ChangeExerciseSetOrderDto,
  ) {
    return this.trainingsService.changeExerciseSetOrder(
      id,
      exerciseSetId,
      body.order,
    );
  }

  @Get()
  findAll() {
    return this.trainingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingsService.findById(id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingsService.remove(id);
  }
}
