import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'REQUIRED_NAME' })
  @IsString({ message: 'INVALID_NAME' })
  name: string;

  @IsNotEmpty({ message: 'REQUIRED_EMAIL' })
  @IsString({ message: 'INVALID_EMAIL' })
  @IsEmail({}, { message: 'INVALID_EMAIL' })
  email: string;

  @IsNotEmpty({ message: 'REQUIRED_PASSWORD' })
  @IsString({ message: 'INVALID_PASSWORD' })
  @IsStrongPassword({}, { message: 'WEAK_PASSWORD' })
  password: string;
}
