import { IsNotEmpty } from 'class-validator';

export class CreateMuscleDto {
  @IsNotEmpty({ message: 'REQUIRED_NAME' })
  name: string;
}
