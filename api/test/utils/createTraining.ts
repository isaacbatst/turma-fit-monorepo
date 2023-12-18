import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DASHBOARD_AUTH_COOKIE } from '../../src/constants/cookies';

export const createMuscle = async (app: INestApplication, token: string) => {
  const response = await request(app.getHttpServer())
    .post('/muscles')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Biceps' });

  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();

  return response.body.id;
};

export const createMoviment = async (
  app: INestApplication,
  token: string,
  muscleId: string,
) => {
  const response = await request(app.getHttpServer())
    .post('/moviments')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'Supino Reto', muscleId });

  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();

  return response.body.id;
};

export const createEquipment = async (
  app: INestApplication,
  token: string,
  name = 'Barra Reta',
) => {
  const response = await request(app.getHttpServer())
    .post('/equipments')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name });

  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();

  return response.body.id;
};

export const createTraining = async (app: INestApplication, token: string) => {
  const createTrainingResponse = await request(app.getHttpServer())
    .post('/trainings')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send({ name: 'biceps' });
  expect(createTrainingResponse.status).toBe(201);
  expect(createTrainingResponse.body.id).toBeDefined();

  return createTrainingResponse.body.id as string;
};

export const createExerciseSet = async (
  app: INestApplication,
  token: string,
  trainingId: string,
  movimentId: string,
  equipmentId: string,
) => {
  const response = await request(app.getHttpServer())
    .post(`/trainings/${trainingId}/exercise-set`)
    .send({
      exercise: {
        movimentId: movimentId,
        equipmentIds: [equipmentId],
      },
      sets: 3,
      repetitions: 10,
    })
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  return response.body.id;
};

export const createWeekPlan = async (app: INestApplication, token: string) => {
  const createWeekPlanResponse = await request(app.getHttpServer())
    .post('/week-plans')
    .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
    .send();
  expect(createWeekPlanResponse.status).toBe(201);
  expect(createWeekPlanResponse.body.id).toBeDefined();

  return createWeekPlanResponse.body.id as string;
};
