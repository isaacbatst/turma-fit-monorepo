import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { OrderedList } from '../../core/ordered-list';
import { Training } from './training.entity';
import { TrainingSerialized } from './training.serialized';
import { WeekPlanSerialized } from './week-plan.serialized';

export class WeekPlan {
  private trainings = new OrderedList<Training, TrainingSerialized>();
  private letterMap = new Map<string, number>([
    ['A', 1],
    ['B', 2],
    ['C', 3],
    ['D', 4],
    ['E', 5],
    ['F', 6],
    ['G', 7],
  ]);

  constructor(
    private id: string,
    private createdAt = new Date(),
    private updatedAt = new Date(),
  ) {}

  addTraining(training: Training) {
    if (this.trainings.size >= 7) throw new ConflictException();
    this.trainings.add(training);
  }

  swapTrainings(day1: string, day2: string) {
    const order1 = this.getOrderByDay(day1);
    const order2 = this.getOrderByDay(day2);
    this.trainings.swap(order1, order2);
  }

  removeTraining(day: string) {
    const order = this.getOrderByDay(day);
    const training = this.trainings.getByOrder(order);
    if (!training) throw new NotFoundException();
    this.trainings.delete(training.id);
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

  getTrainingByDay(day: string) {
    const order = this.getOrderByDay(day);
    return this.trainings.getByOrder(order);
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

  private trainingsToJSON() {
    const trainings = this.trainings.toJSON();
    return {
      items: trainings.items.map((training) =>
        this.addTrainingLetter(training.data, training.order),
      ),
    };
  }

  private addTrainingLetter(training: TrainingSerialized, order: number) {
    return {
      order,
      data: {
        ...training,
        letter: this.getDayByOrder(order),
      },
    };
  }
}
