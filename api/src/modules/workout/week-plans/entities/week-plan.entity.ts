import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { OrderedList } from '../../../core/ordered-list';
import { WeekPlanTraining } from './week-plan-training.entity';
import { WeekPlanTrainingSerialized } from './week-plan-training.serialized';
import { WeekPlanChange } from './week-plan.change';
import { WeekPlanSerialized } from './week-plan.serialized';

export class WeekPlan {
  private trainings = new OrderedList<
    WeekPlanTraining,
    WeekPlanTrainingSerialized
  >();
  private letterMap = new Map<string, number>([
    ['A', 1],
    ['B', 2],
    ['C', 3],
    ['D', 4],
    ['E', 5],
    ['F', 6],
    ['G', 7],
  ]);
  readonly changes: WeekPlanChange[] = [];

  constructor(
    readonly id: string,
    private createdAt = new Date(),
    private updatedAt = new Date(),
  ) {}

  restoreTrainings(trainings: WeekPlanTraining[]) {
    trainings.forEach((training) => {
      this.validateTrainingsSize();
      this.trainings.add(training);
    });
  }

  addTraining(training: WeekPlanTraining) {
    this.validateTrainingsSize();
    const order = this.trainings.add(training);
    this.updatedAt = new Date();
    this.changes.push({
      type: 'add-training',
      training: {
        data: training,
        order,
      },
    });
    return order;
  }

  swapTrainings(day1: string, day2: string) {
    const order1 = this.getOrderByDay(day1);
    const order2 = this.getOrderByDay(day2);
    this.trainings.swap(order1, order2);
    this.updatedAt = new Date();
    this.changes.push({
      type: 'swap-training',
      day1,
      day2,
    });
  }

  removeTraining(day: string) {
    const order = this.getOrderByDay(day);
    const training = this.trainings.getByOrder(order);
    if (!training) throw new NotFoundException('TRAINING_NOT_FOUND');
    this.trainings.delete(training.id);
    this.updatedAt = new Date();
    this.changes.push({
      type: 'remove-training',
      training: {
        data: training,
        order,
      },
    });
  }

  getTrainingById(id: string) {
    return this.trainings.get(id);
  }

  getTrainingByDay(day: string) {
    const order = this.getOrderByDay(day);
    return this.trainings.getByOrder(order);
  }

  getTrainingOrderById(id: string) {
    return this.trainings.getItemOrder(id);
  }

  getId() {
    return this.id;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  toJSON(): WeekPlanSerialized {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      trainings: this.trainingsToJSON(),
    };
  }

  getOrderByDay(day: string) {
    const order = this.letterMap.get(day);
    if (!order) throw new BadRequestException();
    return order;
  }

  getDayByOrder(order: number) {
    const day = Array.from(this.letterMap.entries()).find(
      ([_, value]) => value === order,
    );
    if (!day) throw new BadRequestException();
    return day[0];
  }

  private validateTrainingsSize() {
    if (this.hasMaxTrainings()) {
      throw new ConflictException('MAX_TRAININGS_REACHED');
    }
  }

  private hasMaxTrainings() {
    return this.trainings.size >= 7;
  }

  private trainingsToJSON() {
    const trainings = this.trainings.toJSON();
    return trainings.map((training) =>
      this.addTrainingLetter(training, training.order),
    );
  }

  private addTrainingLetter(
    training: WeekPlanTrainingSerialized,
    order: number,
  ) {
    return {
      order,
      day: this.getDayByOrder(order),
      ...training,
    };
  }
}
