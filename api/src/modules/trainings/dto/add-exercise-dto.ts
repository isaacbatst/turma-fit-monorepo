import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Grip } from '../entities/grip.enum';

class Exercise {
  @IsNotEmpty({ message: 'REQUIRED_MOVIMENT_ID' })
  @IsString({ message: 'INVALID_MOVIMENT_ID' })
  movimentId: string;
  @IsString({ each: true, message: 'INVALID_EQUIPMENT_ID' })
  equipmentIds?: Array<string>;
  @IsOptional()
  @IsEnum(Grip, { message: 'INVALID_GRIP' })
  grip?: Grip;
}

export class AddExerciseDto {
  @ValidateNested()
  @IsNotEmpty({ message: 'REQUIRED_EXERCISE' })
  @Type(() => Exercise)
  exercise: Exercise;
  @IsNotEmpty({ message: 'REQUIRED_SETS' })
  @IsNumber({}, { message: 'INVALID_SETS' })
  sets: number;
  @IsNotEmpty({ message: 'REQUIRED_REPETITIONS' })
  @IsNumber({}, { message: 'INVALID_REPETITIONS' })
  repetitions: number;
  restTime?: number;
}
