import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekPlanningService } from './week-planning.service';
import { CreateWeekPlanningDto } from './dto/create-week-planning.dto';
import { UpdateWeekPlanningDto } from './dto/update-week-planning.dto';

@Controller('week-planning')
export class WeekPlanningController {
  constructor(private readonly weekPlanningService: WeekPlanningService) {}

  @Post()
  create(@Body() createWeekPlanningDto: CreateWeekPlanningDto) {
    return this.weekPlanningService.create(createWeekPlanningDto);
  }

  @Get()
  findAll() {
    return this.weekPlanningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekPlanningService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekPlanningDto: UpdateWeekPlanningDto) {
    return this.weekPlanningService.update(+id, updateWeekPlanningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekPlanningService.remove(+id);
  }
}
