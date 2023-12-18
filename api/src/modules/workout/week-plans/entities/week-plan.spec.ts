import { ConflictException, NotFoundException } from '@nestjs/common';
import { WeekPlanTraining } from './week-plan-training.entity';
import {
  WeekPlanChangeAddTraining,
  WeekPlanChangeSwapTraining,
} from './week-plan.change';
import { WeekPlan } from './week-plan.entity';

describe('Week Plan', () => {
  it('should create an empty week plan', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    expect(weekPlan).toBeTruthy();
    expect(weekPlan.getId()).toEqual('week-plan-id');
    expect(weekPlan.changes).toHaveLength(0);
  });

  it('should add a training to the week plan', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const training = new WeekPlanTraining('a-training-id');
    weekPlan.addTraining(training);
    expect(weekPlan.getTrainingByDay('A')).toEqual(training);
    expect(weekPlan.changes).toHaveLength(1);
    expect(weekPlan.changes[0].type).toBe('add-training');
    const change = weekPlan.changes[0] as WeekPlanChangeAddTraining;
    expect(change.trainingId).toBe('a-training-id');
  });

  it('should get training by id', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const training = new WeekPlanTraining('a-training-id');
    weekPlan.addTraining(training);
    expect(weekPlan.getTrainingById('a-training-id')?.item).toEqual(training);
  });

  it('should remove a training from the week plan', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const training = new WeekPlanTraining('a-training-id');
    weekPlan.addTraining(training);
    expect(weekPlan.getTrainingByDay('A')).toEqual(training);
    weekPlan.removeTraining('A');
    expect(weekPlan.getTrainingByDay('A')).toBeUndefined();
    expect(weekPlan.changes).toHaveLength(2);
    expect(weekPlan.changes[0].type).toBe('add-training');
    expect(weekPlan.changes[1].type).toBe('remove-training');
  });

  it('should throw an error when trying to remove a training that is not in the week plan', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    expect(() => weekPlan.removeTraining('A')).toThrowError(NotFoundException);
  });

  it('should throw try to add more than 7 trainings', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const trainingA = new WeekPlanTraining('a-training-id');
    const trainingB = new WeekPlanTraining('b-training-id');
    const trainingC = new WeekPlanTraining('c-training-id');
    const trainingD = new WeekPlanTraining('d-training-id');
    const trainingE = new WeekPlanTraining('e-training-id');
    const trainingF = new WeekPlanTraining('f-training-id');
    const trainingG = new WeekPlanTraining('g-training-id');
    const trainingH = new WeekPlanTraining('h-training-id');
    weekPlan.addTraining(trainingA);
    weekPlan.addTraining(trainingB);
    weekPlan.addTraining(trainingC);
    weekPlan.addTraining(trainingD);
    weekPlan.addTraining(trainingE);
    weekPlan.addTraining(trainingF);
    weekPlan.addTraining(trainingG);
    expect(() => weekPlan.addTraining(trainingH)).toThrowError(
      ConflictException,
    );
  });

  it('should swap two trainings', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const trainingA = new WeekPlanTraining('a-training-id');
    const trainingB = new WeekPlanTraining('b-training-id');
    weekPlan.addTraining(trainingA);
    weekPlan.addTraining(trainingB);
    weekPlan.swapTrainings('A', 'B');
    expect(weekPlan.getTrainingByDay('A')).toEqual(trainingB);
    expect(weekPlan.getTrainingByDay('B')).toEqual(trainingA);
    expect(weekPlan.changes).toHaveLength(3);
    expect(weekPlan.changes[0].type).toBe('add-training');
    expect(weekPlan.changes[1].type).toBe('add-training');
    expect(weekPlan.changes[2].type).toBe('swap-training');
    const change = weekPlan.changes[2] as WeekPlanChangeSwapTraining;
    expect(change.day1).toBe('A');
    expect(change.day2).toBe('B');
  });

  it('should throw an error when trying to swap a training that does not exist', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const trainingA = new WeekPlanTraining('a-training-id');
    weekPlan.addTraining(trainingA);
    expect(() => weekPlan.swapTrainings('A', 'B')).toThrowError(
      NotFoundException,
    );
  });

  it('should reorder trainings when a training is removed', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const trainingA = new WeekPlanTraining('a-training-id');
    const trainingB = new WeekPlanTraining('b-training-id');
    const trainingC = new WeekPlanTraining('c-training-id');
    weekPlan.addTraining(trainingA);
    weekPlan.addTraining(trainingB);
    weekPlan.addTraining(trainingC);
    weekPlan.removeTraining('B');
    expect(weekPlan.getTrainingByDay('A')).toEqual(trainingA);
    expect(weekPlan.getTrainingByDay('B')).toEqual(trainingC);
    expect(weekPlan.getTrainingByDay('C')).toBeUndefined();
    expect(weekPlan.changes).toHaveLength(4);
    expect(weekPlan.changes[0].type).toBe('add-training');
    expect(weekPlan.changes[1].type).toBe('add-training');
    expect(weekPlan.changes[2].type).toBe('add-training');
    expect(weekPlan.changes[3].type).toBe('remove-training');
  });

  it('should serialize week plan', () => {
    const weekPlan = new WeekPlan('week-plan-id');
    const trainingA = new WeekPlanTraining('a-training-id');
    const trainingB = new WeekPlanTraining('b-training-id');
    weekPlan.addTraining(trainingA);
    weekPlan.addTraining(trainingB);
    const serialized = weekPlan.toJSON();
    expect(serialized.id).toBe('week-plan-id');
    expect(serialized.trainings).toHaveLength(2);
    expect(serialized.trainings[0].id).toBe('a-training-id');
    expect(serialized.trainings[0].day).toBe('A');
    expect(serialized.trainings[1].id).toBe('b-training-id');
    expect(serialized.trainings[1].day).toBe('B');
  });
});
