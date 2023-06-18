import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MusclesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/muscles (POST) returns 400 without name', async () => {
    const response = await request(app.getHttpServer()).post('/muscles');

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('O campo nome é obrigatório');
  });

  it('/muscles (POST) returns 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/muscles')
      .send({ name: 'biceps' });

    expect(response.status).toBe(201);
  });

  it('/muscles (GET) empty list', async () => {
    await request(app.getHttpServer()).get('/muscles').expect(200).expect([]);
  });

  it('/muscles (GET) after create', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/muscles')
      .send({ name: 'biceps' });

    expect(postResponse.status).toBe(201);

    const getResponse = await request(app.getHttpServer()).get('/muscles');

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toContainEqual({
      id: postResponse.body.id,
      name: 'biceps',
    });
  });
});
