import { NotFoundException } from '@nestjs/common';
import { WithId } from '../../common/types/WithId';
import { WithOrder } from '../../common/types/WithOrder';

export type OrderedListItem = WithOrder & WithId;

export class OrderedList<T extends OrderedListItem> {
  constructor(
    private readonly items: T[] = [],
    private notFoundMessage: string = 'ITEM_NOT_FOUND',
  ) {}

  add(item: T) {
    this.items.push(item);
  }

  getById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getByOrder(order: number): T | undefined {
    return this.items.find((item) => item.getOrder() === order);
  }

  getNextOrder(): number {
    return this.items.length + 1;
  }

  getItems(): T[] {
    return [...this.items];
  }

  changeOrder(itemId: string, newOrder: number) {
    const item = this.items.find((item) => item.id === itemId);
    if (!item) {
      throw new NotFoundException(this.notFoundMessage);
    }
    const oldOrder = item.getOrder();

    if (oldOrder < newOrder) {
      this.items
        .filter(
          (item) => item.getOrder() <= newOrder && item.getOrder() > oldOrder,
        )
        .forEach((item) => item.changeOrder(item.getOrder() - 1));
    } else {
      this.items
        .filter(
          (item) => item.getOrder() >= newOrder && item.getOrder() < oldOrder,
        )
        .forEach((item) => item.changeOrder(item.getOrder() + 1));
    }
    item.changeOrder(newOrder);
  }

  remove(itemId: string) {
    const item = this.items.find((item) => item.id === itemId);
    if (!item) {
      throw new NotFoundException(this.notFoundMessage);
    }
    const order = item.getOrder();
    this.items.splice(this.items.indexOf(item), 1);
    this.items
      .filter((item) => item.getOrder() > order)
      .forEach((item) => item.changeOrder(item.getOrder() - 1));
  }
}
