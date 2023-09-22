import { IsNotEmpty } from 'class-validator';

export class CreateEquipmentDto {
  @IsNotEmpty({ message: 'REQUIRED_NAME' })
  readonly name: string;
}
