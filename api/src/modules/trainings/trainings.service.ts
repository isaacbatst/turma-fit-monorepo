import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryCrud } from '../../common/repositories/repository.crud';
import {
  EQUIPMENT_REPOSITORY,
  ID_GENERATOR,
  MOVIMENT_REPOSITORY,
  TRAINING_REPOSITORY,
} from '../../constants/tokens';
import { IdGenerator } from '../core/IdGenerator/IdGenerator';
import { EquipmentsRepository } from '../equipments/repositories/equipments.repository';
import { Moviment } from '../moviments/entities/moviment.entity';
import { AddExerciseDto } from './dto/add-exercise-dto';
import { Exercise } from './entities/exercise.entity';
import { Training } from './entities/training.entity';
import { TrainingsRepository } from './repositories/trainings.repository';

@Injectable()
export class TrainingsService {
  constructor(
    @Inject(TRAINING_REPOSITORY)
    private trainingRepository: TrainingsRepository,
    @Inject(ID_GENERATOR) private idGenerator: IdGenerator,
    @Inject(MOVIMENT_REPOSITORY)
    private movimentRepository: RepositoryCrud<Moviment>,
    @Inject(EQUIPMENT_REPOSITORY)
    private equipmentRepository: EquipmentsRepository,
  ) {}

  async create() {
    const id = this.idGenerator.generate();
    const training = new Training(id);
    await this.trainingRepository.create(training);
    return {
      id,
    };
  }

  async addExerciseSet(trainingId: string, input: AddExerciseDto) {
    const training = await this.trainingRepository.findById(trainingId);
    if (!training) throw new NotFoundException('TRAINING_NOT_FOUND');

    const moviment = await this.movimentRepository.findById(
      input.exercise.movimentId,
    );

    if (!moviment) throw new NotFoundException('MOVIMENT_NOT_FOUND');
    const equipments = input.exercise.equipmentIds
      ? await this.equipmentRepository.findByIds(input.exercise.equipmentIds)
      : [];
    const exerciseId = this.idGenerator.generate();
    const exercise = new Exercise(
      exerciseId,
      moviment,
      equipments,
      input.exercise.grip,
    );
    const setId = this.idGenerator.generate();
    const exerciseSet = training.addExercise(
      setId,
      exercise,
      input.sets,
      input.repetitions,
    );
    await this.trainingRepository.addExerciseSet(training, exerciseSet);
  }

  async findAll() {
    const trainings = await this.trainingRepository.findAll();
    return trainings.map((training) => training.toJSON());
  }

  async findById(id: string) {
    const training = await this.trainingRepository.findById(id);
    if (!training) throw new NotFoundException('TRAINING_NOT_FOUND');
    return training.toJSON();
  }

  async remove(id: string) {
    await this.trainingRepository.remove(id);
  }
}
