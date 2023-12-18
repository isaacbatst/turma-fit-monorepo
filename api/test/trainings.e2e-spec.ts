import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/modules/core/DataSource/prisma.service';
import { createTestApp } from './utils/app';
import { loginAdmin } from './utils/loginAdmin';
import { resetDatabase } from './utils/resetDatabase';
import { DASHBOARD_AUTH_COOKIE } from '../src/constants/cookies';
import {
  createEquipment,
  createExerciseSet,
  createMoviment,
  createMuscle,
  createTraining,
} from './utils/createTraining';
import { TrainingSerialized } from '../src/modules/workout/trainings/entities/training.serialized';

describe('TrainingsController (e2e)', () => {
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

  describe('/trainings (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post('/trainings');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 201', async () => {
      const response = await request(app.getHttpServer())
        .post('/trainings')
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`)
        .send({ name: 'biceps' });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('/trainings/:id/exercise-set (POST)', () => {
    it('returns 401 without token', async () => {
      const response = await request(app.getHttpServer()).post(
        '/trainings/1/exercise-set',
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('MISSING_TOKEN');
    });

    it('returns 400 without sets', async () => {
      const response = await request(app.getHttpServer())
        .post(`/trainings/any-id/exercise-set`)
        .send({
          exercise: {
            movimentId: 'any-id',
            equipmentIds: ['any-id'],
          },
          repetitions: 10,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_SETS');
    });

    it('returns 400 without repetitions', async () => {
      const response = await request(app.getHttpServer())
        .post(`/trainings/any-id/exercise-set`)
        .send({
          exercise: {
            movimentId: 'any-id',
            equipmentIds: ['any-id'],
          },
          sets: 3,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_REPETITIONS');
    });

    it('returns 400 with exercise without movimentId', async () => {
      const response = await request(app.getHttpServer())
        .post(`/trainings/any-id/exercise-set`)
        .send({
          exercise: {
            equipmentIds: ['any-id'],
          },
          sets: 3,
          repetitions: 10,
        })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('REQUIRED_MOVIMENT_ID');
    });

    it('returns 201 with exercise created', async () => {
      const equipmentId = await createEquipment(app, token, 'Barra');
      const muscleId = await createMuscle(app, token);
      const movimentId = await createMoviment(app, token, muscleId);
      const trainingId = await createTraining(app, token);
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

      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(200);
      expect(getByIdResponse.body.exerciseSets).toHaveLength(1);
    });
  });

  describe('/trainings (DELETE)', () => {
    it('should delete training', async () => {
      const trainingId = await createTraining(app, token);
      const response = await request(app.getHttpServer())
        .delete(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(response.status).toBe(204);
      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(404);
    });
  });

  describe('/trainings/:id/exercise-set/order (PATCH)', () => {
    it('should change exercise set order', async () => {
      const equipmentId = await createEquipment(app, token, 'Barra');
      const muscleId = await createMuscle(app, token);
      const movimentId = await createMoviment(app, token, muscleId);
      const trainingId = await createTraining(app, token);
      const firstExerciseSetId = await createExerciseSet(
        app,
        token,
        trainingId,
        movimentId,
        equipmentId,
      );
      const secondExerciseSetId = await createExerciseSet(
        app,
        token,
        trainingId,
        movimentId,
        equipmentId,
      );
      const response = await request(app.getHttpServer())
        .patch(
          `/trainings/${trainingId}/exercise-set/${firstExerciseSetId}/order`,
        )
        .send({ order: 2 })
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(204);
      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(200);
      const training = getByIdResponse.body as TrainingSerialized;
      const firstExerciseSet = training.exerciseSets.find(
        (exerciseSet) => exerciseSet.id === firstExerciseSetId,
      );
      expect(firstExerciseSet?.order).toBe(2);
      const secondExerciseSet = training.exerciseSets.find(
        (exerciseSet) => exerciseSet.id === secondExerciseSetId,
      );
      expect(secondExerciseSet?.order).toBe(1);
    });
  });

  describe('/trainings/:id/exercise-set/:exerciseSetId (DELETE)', () => {
    it('should delete exercise set', async () => {
      const equipmentId = await createEquipment(app, token, 'Barra');
      const muscleId = await createMuscle(app, token);
      const movimentId = await createMoviment(app, token, muscleId);
      const trainingId = await createTraining(app, token);
      const firstExerciseSetId = await createExerciseSet(
        app,
        token,
        trainingId,
        movimentId,
        equipmentId,
      );
      const secondExerciseSetId = await createExerciseSet(
        app,
        token,
        trainingId,
        movimentId,
        equipmentId,
      );

      const response = await request(app.getHttpServer())
        .delete(`/trainings/${trainingId}/exercise-set/${firstExerciseSetId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);

      expect(response.status).toBe(204);
      const getByIdResponse = await request(app.getHttpServer())
        .get(`/trainings/${trainingId}`)
        .set('Cookie', `${DASHBOARD_AUTH_COOKIE}=${token}`);
      expect(getByIdResponse.status).toBe(200);
      expect(getByIdResponse.body.exerciseSets).toHaveLength(1);
      expect(getByIdResponse.body.exerciseSets[0].id).toBe(secondExerciseSetId);
      expect(getByIdResponse.body.exerciseSets[0].order).toBe(1);
    });
  });
});
