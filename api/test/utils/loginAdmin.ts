import cookie from 'cookie';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';

export const loginAdmin = async (app: INestApplication): Promise<string> => {
  const loginResponse = await request(app.getHttpServer())
    .post('/admin/login')
    .send({ email: 'admin@example.com', password: 'senha-FORTE@032' });
  const cookies = cookie.parse(loginResponse.header['set-cookie'][0]);
  expect(loginResponse.status).toBe(200);
  const token = cookies[DASHBOARD_AUTH_COOKIE];
  expect(token).toBeDefined();
  return token;
};
