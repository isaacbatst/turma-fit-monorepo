import { PartialType } from '@nestjs/mapped-types';
import { CreateWeekPlanningDto } from './create-week-planning.dto';

export class UpdateWeekPlanningDto extends PartialType(CreateWeekPlanningDto) {}
