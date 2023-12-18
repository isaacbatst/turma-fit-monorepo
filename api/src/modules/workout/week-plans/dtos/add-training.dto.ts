import { IsNotEmpty, IsString } from 'class-validator';

export class AddTrainingDto {
  @IsNotEmpty()
  @IsString()
  trainingId: string;
}
