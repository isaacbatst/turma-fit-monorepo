import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty({ message: 'REQUIRED_EMAIL' })
  @IsString({ message: 'INVALID_EMAIL' })
  @IsEmail({}, { message: 'INVALID_EMAIL' })
  email: string;

  @IsNotEmpty({ message: 'REQUIRED_PASSWORD' })
  @IsString({ message: 'INVALID_PASSWORD' })
  password: string;
}
