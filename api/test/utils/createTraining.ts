import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';

export const createTraining = async (app: INestApplication, token: string) => {
  const createTrainingResponse = await request(app.getHttpServer())
    .post('/trainings')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'biceps' });
  expect(createTrainingResponse.status).toBe(201);
  expect(createTrainingResponse.body.id).toBeDefined();

  const createMuscleResponse = await request(app.getHttpServer())
    .post('/muscles')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Biceps' });
  expect(createMuscleResponse.status).toBe(201);
  expect(createMuscleResponse.body.id).toBeDefined();

  const createMovimentResponse = await request(app.getHttpServer())
    .post('/moviments')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Supino Reto', muscleId: createMuscleResponse.body.id });
  expect(createMovimentResponse.status).toBe(201);
  expect(createMovimentResponse.body.id).toBeDefined();

  const createEquipmentResponse = await request(app.getHttpServer())
    .post('/equipments')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Barra Reta' });

  expect(createEquipmentResponse.status).toBe(201);
  expect(createEquipmentResponse.body.id).toBeDefined();

  return {
    trainingId: createTrainingResponse.body.id,
    movimentId: createMovimentResponse.body.id,
    equipmentId: createEquipmentResponse.body.id,
  };
};
