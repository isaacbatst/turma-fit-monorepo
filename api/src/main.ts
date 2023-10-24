import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { validationPipeExceptionFactory } from './common/format-errors';
async function bootstrap() {
  console.log('Starting app env: ', process.env);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: process.env.DASHBOARD_URL,
      credentials: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationPipeExceptionFactory,
    }),
  );
  app.use(cookieParser());
  app.enableShutdownHooks();
  await app.listen(5555);
}

bootstrap();
