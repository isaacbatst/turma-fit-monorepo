import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';

describe('EquipmentsController (e2e)', () => {
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

  describe('/equipments (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/equipments');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without name', async () => {
      const response = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('returns 409 with repeated name', async () => {
      const response1 = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      expect(response1.status).toBe(201);

      const response2 = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });
      expect(response2.status).toBe(409);
      expect(response2.body.message).toBe('DUPLICATED_NAME');
    });
  });

  describe('/equipments (GET)', () => {
    it('/equipments (GET) empty list', async () => {
      await request(app.getHttpServer())
        .get('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .expect(200)
        .expect([]);
    });

    it('/equipments (GET) after create', async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      expect(postResponse.status).toBe(201);

      const getResponse = await request(app.getHttpServer())
        .get('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body[0].id).toBe(postResponse.body.id)
      expect(getResponse.body[0].name).toBe('Barra');
    });
  });

  describe('/equipments (PATCH)', () => {
    let equipmentId: string;

    beforeEach(async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      equipmentId = postResponse.body.id;
    });

    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).patch(
        `/equipments/${equipmentId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without name', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/equipments/${equipmentId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_NAME');
    });

    it('returns 404 with invalid id', async () => {
      const response = await request(app.getHttpServer())
        .patch('/equipments/invalid-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('EQUIPMENT_NOT_FOUND');
    });

    it('returns 204', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/equipments/${equipmentId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Halteres' });

      expect(response.status).toBe(204);
    });
  });

  describe('/equipments (DELETE)', () => {
    let equipmentId: string;

    beforeEach(async () => {
      const postResponse = await request(app.getHttpServer())
        .post('/equipments')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'Barra' });

      expect(postResponse.status).toBe(201);
      equipmentId = postResponse.body.id;
    });

    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/equipments/${equipmentId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 404 with invalid id', async () => {
      const response = await request(app.getHttpServer())
        .delete('/equipments/invalid-id')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('EQUIPMENT_NOT_FOUND');
    });

    it('returns 204', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/equipments/${equipmentId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(204);
    });
  });
});
