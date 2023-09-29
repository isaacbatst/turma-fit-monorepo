import { Injectable } from '@nestjs/common';
import { CreateWeekPlanningDto } from './dto/create-week-planning.dto';
import { UpdateWeekPlanningDto } from './dto/update-week-planning.dto';

@Injectable()
export class WeekPlanningService {
  create(createWeekPlanningDto: CreateWeekPlanningDto) {
    return 'This action adds a new weekPlanning';
  }

  findAll() {
    return `This action returns all weekPlanning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weekPlanning`;
  }

  update(id: number, updateWeekPlanningDto: UpdateWeekPlanningDto) {
    return `This action updates a #${id} weekPlanning`;
  }

  remove(id: number) {
    return `This action removes a #${id} weekPlanning`;
  }
}
