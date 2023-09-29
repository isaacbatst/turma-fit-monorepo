import { IsNumber, IsPositive } from 'class-validator';

export class ChangeExerciseSetOrderDto {
  @IsNumber({}, { message: 'INVALID_ORDER' })
  @IsPositive({ message: 'INVALID_ORDER' })
  order: number;
}
