import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PRISMA_SERVICE } from './constants/tokens';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: process.env.DASHBOARD_URL,
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const prismaService = app.get(PRISMA_SERVICE);
  await prismaService.enableShutdownHooks(app);
  await app.listen(5555);
}
bootstrap();
