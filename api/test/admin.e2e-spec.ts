import { INestApplication } from '@nestjs/common';
import * as cookie from 'cookie';
import * as request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const sut = await createTestApp();
    app = sut.app;
    prisma = sut.prisma;
  });

  afterEach(async () => {
    await resetDatabase(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/admin (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/admin');
      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without params', async () => {
      const token = await loginAdmin(app);
      const response = await request(app.getHttpServer())
        .post('/admin')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
      expect(response.body.message).toContain('REQUIRED_EMAIL');
      expect(response.body.message).toContain('REQUIRED_PASSWORD');
    });

    it('returns 400 with invalid e-mail', async () => {
      const token = await loginAdmin(app);
      const response = await request(app.getHttpServer())
        .post('/admin')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ email: 'invalid-email' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('INVALID_EMAIL');
    });

    it('returns 400 with weak password', async () => {
      const token = await loginAdmin(app);
      const response = await request(app.getHttpServer())
        .post('/admin')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ password: '123' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('WEAK_PASSWORD');
    });

    it('returns 201', async () => {
      const token = await loginAdmin(app);
      const response = await request(app.getHttpServer())
        .post('/admin')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({
          name: 'admin',
          email: 'admin-2@example.com',
          password: 'senha-FORTE@032',
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('/admin/login (POST)', () => {
    it('returns 400 without params', async () => {
      const response = await request(app.getHttpServer()).post('/admin/login');
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_EMAIL');
      expect(response.body.message).toContain('REQUIRED_PASSWORD');
    });

    it('returns 400 with invalid e-mail', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/login')
        .send({ email: 'invalid-email' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('INVALID_EMAIL');
    });

    it('returns 401 with not found email', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/login')
        .send({ email: 'not-found@example.com', password: 'senha-FORTE@032' });
      expect(response.status).toBe(401);
    });

    it('returns 401 with found email and invalid password', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'invalid-password' });
      expect(response.status).toBe(401);
    });

    it('returns 200 with found email and valid password', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/login')
        .send({ email: 'admin@example.com', password: 'senha-FORTE@032' });
      const cookies = cookie.parse(response.header['set-cookie'][0]);
      expect(response.status).toBe(200);
      expect(cookies[DASHBOARD_AUTH_COOKIE]).toBeDefined();
    });
  });
});
