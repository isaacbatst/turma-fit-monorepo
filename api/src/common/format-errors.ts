import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function formatErrorsHelper(errors: ValidationError[]): string[] {
  return errors.reduce<string[]>((acc, err): string[] => {
    const { constraints, children } = err;
    if (constraints) {
      const values = Object.values(constraints);
      acc = acc.concat(values);
    }
    if (Array.isArray(children) && children.length > 0) {
      acc = acc.concat(formatErrorsHelper(children));
    }
    return acc;
  }, []);
}

export const validationPipeExceptionFactory = (errors: ValidationError[]) => {
  return new BadRequestException(formatErrorsHelper(errors));
};
