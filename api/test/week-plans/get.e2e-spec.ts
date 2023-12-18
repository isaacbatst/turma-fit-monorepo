import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';
import { PrismaService } from '../../src/modules/core/DataSource/prisma.service';
import { createTestApp } from '../utils/app';
import { loginAdmin } from '../utils/loginAdmin';
import { resetDatabase } from '../utils/resetDatabase';

describe('WeekPlanController (e2e) - Get', () => {
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
});
