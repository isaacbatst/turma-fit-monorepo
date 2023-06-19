import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { resetDatabase } from './utils/resetDatabase';
import { PRISMA_SERVICE } from '../src/constants/tokens';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = app.get(PRISMA_SERVICE);
    await resetDatabase(prisma);
  });

  afterAll(async () => {
    await resetDatabase(prisma);
  });

  describe('/admin (POST)', () => {
    it('returns 400 without params', async () => {
      const response = await request(app.getHttpServer()).post('/admin');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('O campo nome é obrigatório');
      expect(response.body.message).toContain('O campo e-mail é obrigatório');
      expect(response.body.message).toContain('O campo senha é obrigatório');
    });

    it('returns 400 with invalid e-mail', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin')
        .send({ email: 'invalid-email' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('E-mail inválido');
    });

    it('returns 400 with weak password', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin')
        .send({ password: '123' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('A senha deve ser forte');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer()).post('/admin').send({
        name: 'admin',
        email: 'admin@example.com',
        password: 'senha-FORTE@032',
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('/admin/login (POST)', () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/admin').send({
        name: 'admin',
        email: 'admin@example.com',
        password: 'senha-FORTE@032',
      });
    });

    it('returns 400 without params', async () => {
      const response = await request(app.getHttpServer()).post('/admin/login');
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('O campo e-mail é obrigatório');
      expect(response.body.message).toContain('O campo senha é obrigatório');
    });

    it('returns 400 with invalid e-mail', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/login')
        .send({ email: 'invalid-email' });
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('E-mail inválido');
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

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
