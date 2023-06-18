import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @IsString({ message: 'O campo nome deve ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsString({ message: 'O campo e-mail deve ser uma string' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @IsString({ message: 'O campo senha deve ser uma string' })
  @IsStrongPassword({}, { message: 'A senha deve ser forte' })
  password: string;
}
