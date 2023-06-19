import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Roles(Role.admin)
  @Post()
  create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.musclesService.create(createMuscleDto);
  }

  @Get()
  findAll() {
    return this.musclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuscleDto: UpdateMuscleDto) {
    return this.musclesService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musclesService.remove(id);
  }
}
