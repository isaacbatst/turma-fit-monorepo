import { Serializable } from '../../common/types/Serializable';
import { OrderedListItemSerialized } from './ordered-list-item.serialized';

export class OrderedListItem<
  T extends Serializable<S>,
  S extends Record<string, unknown>,
> implements Serializable<OrderedListItemSerialized<S>>
{
  readonly data: T;
  private order: number;

  constructor(order: number, data: T) {
    this.order = order;
    this.data = data;
  }
  getOrder() {
    return this.order;
  }
  changeOrder(newOrder: number) {
    this.order = newOrder;
  }
  isMovingBackwards(newOrder: number) {
    return this.order > newOrder;
  }
  isMovingForward(newOrder: number) {
    return this.order < newOrder;
  }
  isBetweenMovingForward(oldOrder: number, newOrder: number) {
    return this.order > oldOrder && this.order <= newOrder;
  }
  isBetweenMovingBackwards(oldOrder: number, newOrder: number) {
    return this.order >= newOrder && this.order < oldOrder;
  }
  isAfter(order: number) {
    return this.order > order;
  }
  moveFoward(step = 1) {
    this.order += step;
  }
  moveBackwards(step = 1) {
    this.order -= step;
  }

  toJSON() {
    return {
      order: this.order,
      ...this.data.toJSON(),
    };
  }
}
