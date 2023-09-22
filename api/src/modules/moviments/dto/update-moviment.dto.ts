import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentDto } from './create-moviment.dto';

export class UpdateMovimentDto extends PartialType(CreateMovimentDto) {}
