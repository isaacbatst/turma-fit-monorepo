import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveTrainingDto {
  @IsNotEmpty()
  @IsString()
  day: string;
}
