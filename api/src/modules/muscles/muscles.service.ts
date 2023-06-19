import { Inject, Injectable } from '@nestjs/common';
import { ID_GENERATOR, MUSCLE_REPOSITORY } from '../../constants/tokens';
import { IdGenerator } from '../core/IdGenerator/IdGenerator';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { ReadMuscleDto } from './dto/read-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Muscle } from './entities/muscle.entity';
import { MusclesRepository } from './repositories/muscles.repository';

@Injectable()
export class MusclesService {
  constructor(
    @Inject(MUSCLE_REPOSITORY) private readonly repository: MusclesRepository,
    @Inject(ID_GENERATOR) private readonly idGenerator: IdGenerator,
  ) {}

  async create(createMuscleDto: CreateMuscleDto) {
    const id = this.idGenerator.generate();
    const muscle = new Muscle(id, createMuscleDto.name);
    await this.repository.create(muscle);
    return {
      id,
    };
  }

  async findAll(): Promise<ReadMuscleDto[]> {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return `This action returns a #${id} muscle`;
  }

  async update(id: string, updateMuscleDto: UpdateMuscleDto) {
    const muscle = new Muscle(id, updateMuscleDto.name);
    await this.repository.update(muscle);
  }

  async remove(id: string) {
    await this.repository.remove(id);
  }
}
