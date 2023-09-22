import { IsNotEmpty } from 'class-validator';

export class CreateMovimentDto {
  @IsNotEmpty({ message: 'REQUIRED_NAME' })
  readonly name: string;
  @IsNotEmpty({ message: 'REQUIRED_MUSCLE_ID' })
  readonly muscleId: string;
}
