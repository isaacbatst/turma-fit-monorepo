import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaErrorAdapter {
  constructor(private entityName: string) {}

  adapt(err: unknown): never {
    const isPrismaError = this.isPrismaError(err);
    if (isPrismaError && err.code === 'P2002') {
      const repeatedField = (err.meta?.target as string[])[0];
      const message = `${repeatedField.toUpperCase()}_ALREADY_EXISTS`;
      throw new ConflictException({ message });
    }

    if (isPrismaError && err.code === 'P2025') {
      const message = `${this.entityName.toUpperCase()}_NOT_FOUND`;
      throw new NotFoundException({ message });
    }
    console.log('aalooooo', isPrismaError);
    console.log(isPrismaError && err.code);
    console.error(err);
    throw new InternalServerErrorException();
  }

  private isPrismaError(
    err: unknown,
  ): err is Prisma.PrismaClientKnownRequestError {
    return err instanceof Prisma.PrismaClientKnownRequestError;
  }
}
