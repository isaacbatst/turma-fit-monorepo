import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';
import { createTraining } from './utils/createTraining';

describe('TrainingsController (e2e)', () => {
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

  describe('/trainings (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/trainings');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/trainings')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('/trainings/:id/add-exercise-set (PATCH)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).patch(
        '/trainings/1/add-exercise-set',
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without sets', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/trainings/any-id/add-exercise-set`)
        .send({
          exercise: {
            movimentId: 'any-id',
            equipmentIds: ['any-id'],
          },
          repetitions: 10,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_SETS');
    });

    it('returns 400 without repetitions', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/trainings/any-id/add-exercise-set`)
        .send({
          exercise: {
            movimentId: 'any-id',
            equipmentIds: ['any-id'],
          },
          sets: 3,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_REPETITIONS');
    });

    it('returns 400 with exercise without movimentId', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/trainings/any-id/add-exercise-set`)
        .send({
          exercise: {
            equipmentIds: ['any-id'],
          },
          sets: 3,
          repetitions: 10,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_MOVIMENT_ID');
    });

    it('returns 201 with exercise created', async () => {
      const { equipmentId, movimentId, trainingId } = await createTraining(
        app,
        token,
      );
      const response = await request(app.getHttpServer())
        .patch(`/trainings/${trainingId}/add-exercise-set`)
        .send({
          exercise: {
            movimentId: movimentId,
            equipmentIds: [equipmentId],
          },
          sets: 3,
          repetitions: 10,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(204);

      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(200);
      expect(getByIdResponse.body.exerciseSets).toHaveLength(1);
    });
  });

  describe('/trainings (DELETE)', () => {
    it('should delete training', async () => {
      const { trainingId } = await createTraining(app, token);
      const response = await request(app.getHttpServer())
        .delete(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(204);
      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(404);
    });
  });
});
