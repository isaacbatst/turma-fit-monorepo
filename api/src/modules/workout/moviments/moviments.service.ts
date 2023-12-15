import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryCrud } from '@/common/repositories/repository.crud';
import {
  ID_GENERATOR,
  MOVIMENT_REPOSITORY,
  MUSCLE_REPOSITORY,
} from '@/constants/tokens';
import { IdGenerator } from '@/modules/core/IdGenerator/IdGenerator';
import { Muscle } from '../muscles/entities/muscle.entity';
import { CreateMovimentDto } from './dto/create-moviment.dto';
import { Moviment } from './entities/moviment.entity';

@Injectable()
export class MovimentsService {
  constructor(
    @Inject(MOVIMENT_REPOSITORY)
    private readonly movimentsRepository: RepositoryCrud<Moviment>,
    @Inject(MUSCLE_REPOSITORY)
    private readonly muscleRepository: RepositoryCrud<Muscle>,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  async create(createMovimentDto: CreateMovimentDto) {
    const id = this.idGenerator.generate();
    const muscle = await this.muscleRepository.findById(
      createMovimentDto.muscleId,
    );

    if (!muscle) {
      throw new NotFoundException('MUSCLE_NOT_FOUND');
    }

    await this.movimentsRepository.create(
      new Moviment(id, createMovimentDto.name, muscle),
    );

    return {
      id,
    };
  }

  async findAll() {
    const moviments = await this.movimentsRepository.findAll();
    return moviments.map((moviment) => moviment.toJSON());
  }

  async delete(id: string) {
    await this.movimentsRepository.remove(id);
  }

  async update(id: string, createMovimentDto: CreateMovimentDto) {
    const muscle = await this.muscleRepository.findById(
      createMovimentDto.muscleId,
    );

    if (!muscle) {
      throw new NotFoundException('MUSCLE_NOT_FOUND');
    }

    await this.movimentsRepository.update(
      new Moviment(id, createMovimentDto.name, muscle),
    );
  }
}
