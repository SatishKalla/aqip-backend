import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new BadRequestException(flattenValidationErrors(errors)),
});

function flattenValidationErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((error) => {
    const constraints = Object.values(error.constraints ?? {});
    const childConstraints = flattenValidationErrors(error.children ?? []);

    return [...constraints, ...childConstraints];
  });
}
