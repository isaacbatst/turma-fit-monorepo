import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';

const createMuscle = async (app: INestApplication, token: string) => {
  const muscleResponse = await request(app.getHttpServer())
    .post('/muscles')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Bíceps' });
  expect(muscleResponse.status).toBe(201);
  expect(muscleResponse.body.id).toBeDefined();

  return {
    id: muscleResponse.body.id,
  };
};

describe('MovimentsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;

  beforeAll(async () => {
    const sut = await createTestApp();
    app = sut.app;
    prisma = sut.prisma;
  });

  beforeEach(async () => {
    token = await loginAdmin(app);
  });

  afterEach(async () => {
    await resetDatabase(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/moviments (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/moviments');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('MISSING_TOKEN');
    });

    it('returns 400 without name', async () => {
      const response = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
    });

    it('returns 400 without muscle id', async () => {
      const response = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_MUSCLE_ID');
    });

    it('returns 404 if muscle not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId: 'not-muscle-id' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('MUSCLE_NOT_FOUND');
    });

    it('returns 201', async () => {
      const { id: muscleId } = await createMuscle(app, token);

      const response = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('returns 409 with repeated name', async () => {
      const { id: muscleId } = await createMuscle(app, token);

      const response1 = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId });

      expect(response1.status).toBe(201);

      const response2 = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId });
      expect(response2.status).toBe(409);
      expect(response2.body.message).toBe('DUPLICATED_NAME');
    });
  });

  describe('/moviments (GET)', () => {
    it('/moviments (GET) empty list', async () => {
      await request(app.getHttpServer())
        .get('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .expect(200)
        .expect([]);
    });

    it('/moviments (GET) after create', async () => {
      const { id: muscleId } = await createMuscle(app, token);
      const postResponse = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId });

      expect(postResponse.status).toBe(201);

      const getResponse = await request(app.getHttpServer())
        .get('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body[0].id).toBe(postResponse.body.id);
      expect(getResponse.body[0].name).toBe('Supino Reto');
      expect(getResponse.body[0].muscle.id).toBe(muscleId);
      expect(getResponse.body[0].muscle.name).toBe('Bíceps');
    });
  });

  describe('/moviments (DELETE)', () => {
    let equipmentId: string;

    beforeEach(async () => {
      const { id: muscleId } = await createMuscle(app, token);
      const postResponse = await request(app.getHttpServer())
        .post('/moviments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Supino Reto', muscleId });

      expect(postResponse.status).toBe(201);
      equipmentId = postResponse.body.id;
    });

    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/moviments/${equipmentId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('MISSING_TOKEN');
    });

    it('returns 404 with invalid id', async () => {
      const response = await request(app.getHttpServer())
        .delete('/moviments/invalid-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('MOVIMENT_NOT_FOUND');
    });

    it('returns 204', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/moviments/${equipmentId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(204);
    });
  });
});
