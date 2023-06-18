import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  @IsString({ message: 'O campo e-mail deve ser uma string' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @IsString({ message: 'O campo senha deve ser uma string' })
  password: string;
}
