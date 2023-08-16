import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PRISMA_SERVICE } from './constants/tokens';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.DASHBOARD_URL,
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PRISMA_SERVICE);
  await prismaService.enableShutdownHooks(app);
  await app.listen(5555);
}
bootstrap();
