import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';
import { PrismaService } from '../../src/modules/core/DataSource/prisma.service';
import { createTestApp } from '../utils/app';
import { createWeekPlan, createTraining } from '../utils/createTraining';
import { loginAdmin } from '../utils/loginAdmin';
import { resetDatabase } from '../utils/resetDatabase';

describe('WeekPlanController (e2e) - Remove Training', () => {
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

  describe('/week-plans/:id/trainings (DELETE)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/week-plans/any-id/trainings',
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 404 with non-existing week plan id', async () => {
      const response = await request(app.getHttpServer())
        .delete('/week-plans/not-found-id/trainings')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ day: 'A' });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('WEEK_PLAN_NOT_FOUND');
    });

    it('returns 404 with non-existing training id', async () => {
      const weekPlanId = await createWeekPlan(app, token);
      const response = await request(app.getHttpServer())
        .delete(`/week-plans/${weekPlanId}/trainings`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ day: 'A' });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('TRAINING_NOT_FOUND');
    });

    describe('with existing week plan and training', () => {
      let response: request.Response;
      let weekPlanId: string;
      beforeEach(async () => {
        weekPlanId = await createWeekPlan(app, token);
        const trainingId = await createTraining(app, token);

        const addTrainingResponse = await request(app.getHttpServer())
          .post(`/week-plans/${weekPlanId}/trainings`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
          .send({ trainingId });
        expect(addTrainingResponse.status).toBe(201);

        response = await request(app.getHttpServer())
          .delete(`/week-plans/${weekPlanId}/trainings`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
          .send({ day: 'A' });
      });

      it('returns 204', async () => {
        expect(response.status).toBe(204);
      });

      it('removes the training from the week plan', async () => {
        const weekPlanResponse = await request(app.getHttpServer())
          .get(`/week-plans/${weekPlanId}`)
          .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
        expect(weekPlanResponse.body.trainings).toHaveLength(0);
      });
    });
  });
});
