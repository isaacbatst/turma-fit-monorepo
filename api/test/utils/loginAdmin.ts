import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const loginAdmin = async (app: INestApplication): Promise<string> => {
  const loginResponse = await request(app.getHttpServer())
    .post('/admin/login')
    .send({ email: 'admin@example.com', password: 'senha-FORTE@032' });
  expect(loginResponse.status).toBe(200);
  expect(loginResponse.body).toHaveProperty('token');
  return loginResponse.body.token;
};
