import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: process.env.DASHBOARD_URL,
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableShutdownHooks();
  await app.listen(5555);
}
bootstrap();
