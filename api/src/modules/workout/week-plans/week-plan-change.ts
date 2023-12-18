export abstract class WeekPlanChange {
  abstract get type(): 'add-training' | 'remove-training' | 'swap-training';
  abstract apply(): Promise<void>;
}
