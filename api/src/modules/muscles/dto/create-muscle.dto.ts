import { IsNotEmpty } from 'class-validator';

export class CreateMuscleDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;
}
