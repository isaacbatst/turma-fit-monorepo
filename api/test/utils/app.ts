import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { PRISMA_SERVICE } from '@/constants/tokens';
import { validationPipeExceptionFactory } from '@/common/format-errors';

export const createTestApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationPipeExceptionFactory,
    }),
  );
  app.use(cookieParser());
  await app.init();
  const prisma = app.get(PRISMA_SERVICE);

  return {
    app,
    prisma,
  };
};
