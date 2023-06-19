import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PRISMA_SERVICE } from '../src/constants/tokens';
import { resetDatabase } from './utils/resetDatabase';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { loginAdmin } from './utils/loginAdmin';

describe('MusclesController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = app.get(PRISMA_SERVICE);
    await resetDatabase(prisma);
    token = await loginAdmin(app);
  });

  afterAll(async () => {
    await resetDatabase(prisma);
  });

  it('/muscles (POST) returns 401 without token', async () => {
    const response = await request(app.getHttpServer()).post('/muscles');

    expect(response.status).toBe(401);
    expect(response.body.message).toContain('MISSING_TOKEN');
  });

  it('/muscles (POST) returns 400 without name', async () => {
    const response = await request(app.getHttpServer())
      .post('/muscles')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('REQUIRED_NAME');
  });

  it('/muscles (POST) returns 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'biceps' });

    expect(response.status).toBe(201);
  });

  it('/muscles (GET) empty list', async () => {
    await request(app.getHttpServer())
      .get('/muscles')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect([]);
  });

  it('/muscles (GET) after create', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'biceps' });

    expect(postResponse.status).toBe(201);

    const getResponse = await request(app.getHttpServer())
      .get('/muscles')
      .set('Authorization', `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toContainEqual({
      id: postResponse.body.id,
      name: 'biceps',
    });
  });
});
