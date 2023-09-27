import {
  Equipment as PrismaEquipment,
  Exercise as PrismaExercise,
  ExerciseSet as PrismaExerciseSet,
  Grip as PrismaGrip,
  Moviment as PrismaMoviment,
  Muscle as PrismaMuscle,
  Training as PrismaTraining,
} from '@prisma/client';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Moviment } from '../../moviments/entities/moviment.entity';
import { Muscle } from '../../muscles/entities/muscle.entity';
import { Exercise } from '../entities/exercise.entity';
import { Grip } from '../entities/grip.enum';
import { Training } from '../entities/training.entity';

export type PrismaExerciseComplete = PrismaExercise & {
  equipments: PrismaEquipment[];
  moviment: PrismaMoviment & {
    muscle: PrismaMuscle;
  };
};

export type PrismaTrainingComplete = PrismaTraining & {
  exerciseSets: (PrismaExerciseSet & {
    exercises: PrismaExerciseComplete[];
  })[];
};

export class TrainingsMapperRepositoryPrisma {
  mapTrainingToEntity(prismaTraining: PrismaTrainingComplete): Training {
    const training = new Training(
      prismaTraining.id,
      prismaTraining.createdAt,
      prismaTraining.updatedAt,
    );

    prismaTraining.exerciseSets.forEach((prismaExerciseSet) => {
      training.addExerciseSet(
        prismaExerciseSet.id,
        prismaExerciseSet.exercises.map((exercise) =>
          this.mapExerciseToEntity(exercise),
        ),
        prismaExerciseSet.sets,
        prismaExerciseSet.repetitions,
        prismaExerciseSet.restTime ?? undefined,
      );
    });

    return training;
  }

  mapExerciseToEntity(exercise: PrismaExerciseComplete): Exercise {
    return new Exercise(
      exercise.id,
      new Moviment(
        exercise.moviment.id,
        exercise.moviment.name,
        new Muscle(exercise.moviment.muscle.id, exercise.moviment.muscle.name),
      ),
      exercise.equipments.map(
        (equipment) => new Equipment(equipment.id, equipment.name),
      ),
      exercise.grip ? this.mapGripToEntity(exercise.grip) : undefined,
    );
  }

  mapGripToPrisma(grip: Grip): PrismaGrip {
    switch (grip) {
      case Grip.supinated:
        return PrismaGrip.SUPINATED;
      case Grip.pronated:
        return PrismaGrip.PRONATED;
      case Grip.neutral:
        return PrismaGrip.NEUTRAL;
    }
  }

  mapGripToEntity(grip: PrismaGrip): Grip {
    switch (grip) {
      case PrismaGrip.SUPINATED:
        return Grip.supinated;
      case PrismaGrip.PRONATED:
        return Grip.pronated;
      case PrismaGrip.NEUTRAL:
        return Grip.neutral;
    }
  }
}
