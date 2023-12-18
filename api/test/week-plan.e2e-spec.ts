import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';
import { createTraining, createWeekPlan } from './utils/createTraining';

describe('WeekPlanController (e2e)', () => {
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

  describe('/week-plans (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/week-plans');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/week-plans')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('/week-plans/ (GET)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).get('/week-plans');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 200', async () => {
      const response = await request(app.getHttpServer())
        .get('/week-plans')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('/week-plans/:id (GET)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).get(
        '/week-plans/any-id',
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 404 with non-existing id', async () => {
      const response = await request(app.getHttpServer())
        .get('/week-plans/any-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('WEEK_PLAN_NOT_FOUND');
    });

    it('returns 200 with existing id', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/week-plans')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send();

      const response = await request(app.getHttpServer())
        .get(`/week-plans/${createResponse.body.id}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createResponse.body.id);
    });
  });

  describe('/week-plans/:id/trainings (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post(
        '/week-plans/any-id/trainings',
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 404 with non-existing week plan id', async () => {
      const response = await request(app.getHttpServer())
        .post('/week-plans/not-found-id/trainings')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ trainingId: 'any-training-id' });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('WEEK_PLAN_NOT_FOUND');
    });

    it('returns 404 with non-existing training id', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/week-plans')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send();

      const response = await request(app.getHttpServer())
        .post(`/week-plans/${createResponse.body.id}/trainings`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ trainingId: 'not-found-training-id' });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('TRAINING_NOT_FOUND');
    });

    describe('with existing week plan and training', () => {
      it('returns 201', async () => {
        const weekPlanId = await createWeekPlan(app, token);
        const trainingId = await createTraining(app, token);

        const addTrainingResponse = await request(app.getHttpServer())
          .post(`/week-plans/${weekPlanId}/trainings`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
          .send({ trainingId });
        expect(addTrainingResponse.status).toBe(201);
      });

      it('links training to week plan', async () => {
        const weekPlanId = await createWeekPlan(app, token);
        const trainingId = await createTraining(app, token);

        await request(app.getHttpServer())
          .post(`/week-plans/${weekPlanId}/trainings`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
          .send({ trainingId });

        const weekPlanResponse = await request(app.getHttpServer())
          .get(`/week-plans/${weekPlanId}`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
        expect(weekPlanResponse.body.trainings).toHaveLength(1);
        expect(weekPlanResponse.body.trainings[0].id).toBe(trainingId);
        expect(weekPlanResponse.body.trainings[0].day).toBe('A');
      });
    });
  });
});
