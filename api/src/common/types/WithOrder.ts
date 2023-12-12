export type WithOrder = {
  getOrder(): number;
  changeOrder(newOrder: number): void;
  isBefore(order: number): boolean;
  isAfter(order: number): boolean;
  isBetween(order1: number, order2: number): boolean;
  incrementOrder(): void;
  decrementOrder(): void;
};
