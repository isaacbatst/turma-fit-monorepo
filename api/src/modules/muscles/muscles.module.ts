import { Module } from '@nestjs/common';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';
import { MUSCLE_REPOSITORY, ID_GENERATOR } from '../../constants/tokens';
import { IdGeneratorFake } from '../core/IdGenerator/IdGeneratorFake';
import { MusclesRepositoryMemory } from './muscles.repository.memory';

@Module({
  controllers: [MusclesController],
  providers: [
    MusclesService,
    { provide: MUSCLE_REPOSITORY, useClass: MusclesRepositoryMemory },
    { provide: ID_GENERATOR, useClass: IdGeneratorFake },
  ],
})
export class MusclesModule {}
