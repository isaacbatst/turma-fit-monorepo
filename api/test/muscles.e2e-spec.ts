import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';

describe('MusclesController (e2e)', () => {
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

  describe('/muscles (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/muscles');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without name', async () => {
      const response = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('returns 409 with repeated name', async () => {
      const response1 = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(response1.status).toBe(201);

      const response2 = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });
      expect(response2.status).toBe(409);
    });
  });

  describe('/muscles (GET)', () => {
    it('/muscles (GET) empty list', async () => {
      await request(app.getHttpServer())
        .get('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .expect(200)
        .expect([]);
    });

    it('/muscles (GET) after create', async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(postResponse.status).toBe(201);

      const getResponse = await request(app.getHttpServer())
        .get('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toContainEqual({
        id: postResponse.body.id,
        name: 'biceps',
      });
    });
  });

  describe('/muscles (PATCH)', () => {
    let muscleId: string;

    beforeEach(async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      muscleId = postResponse.body.id;
    });

    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).patch(
        `/muscles/${muscleId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without name', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/muscles/${muscleId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
    });

    it('returns 404 with invalid id', async () => {
      const response = await request(app.getHttpServer())
        .patch('/muscles/invalid-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(response.status).toBe(404);
    });

    it('returns 204', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/muscles/${muscleId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'triceps' });

      expect(response.status).toBe(204);
    });
  });

  describe('/muscles (DELETE)', () => {
    let muscleId: string;

    beforeEach(async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/muscles')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(postResponse.status).toBe(201);
      muscleId = postResponse.body.id;
    });

    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/muscles/${muscleId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 404 with invalid id', async () => {
      const response = await request(app.getHttpServer())
        .delete('/muscles/invalid-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(404);
    });

    it('returns 204', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/muscles/${muscleId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(204);
    });
  });
});
