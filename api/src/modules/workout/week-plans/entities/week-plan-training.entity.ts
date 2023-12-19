export class WeekPlanTraining {
  constructor(
    readonly id: string,
    readonly trainingId: string,
    readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  getUpdatedAt() {
    return this.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      trainingId: this.trainingId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
