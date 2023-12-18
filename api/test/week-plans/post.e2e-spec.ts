import { INestApplication } from '@nestjs/common';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';
import { PrismaService } from '../../src/modules/core/DataSource/prisma.service';
import { createTestApp } from '../utils/app';
import { loginAdmin } from '../utils/loginAdmin';
import { resetDatabase } from '../utils/resetDatabase';
import request from 'supertest';

describe('WeekPlanController (e2e) - Post', () => {
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
});
