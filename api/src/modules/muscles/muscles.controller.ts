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
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';

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

  @Roles(Role.admin)
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuscleDto: UpdateMuscleDto) {
    return this.musclesService.update(id, updateMuscleDto);
  }

  @Roles(Role.admin)
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musclesService.remove(id);
  }
}
