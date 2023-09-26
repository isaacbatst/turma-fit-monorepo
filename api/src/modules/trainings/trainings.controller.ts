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

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  create() {
    return this.trainingsService.create();
  }

  @HttpCode(204)
  @Patch(':id/add-exercise-set')
  addExercise(@Param('id') id: string, @Body() body: AddExerciseDto) {
    return this.trainingsService.addExerciseSet(id, body);
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
