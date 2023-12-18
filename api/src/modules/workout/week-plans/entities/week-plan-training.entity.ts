export class WeekPlanTraining {
  constructor(
    readonly id: string,
    readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  getUpdatedAt() {
    return this.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
