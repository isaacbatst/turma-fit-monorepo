import { NotFoundException } from '@nestjs/common';
import { WithId } from '../../common/types/WithId';
import { OrderedListItem } from './ordered-list-item';
import { UnknownObject } from '../../common/types/UnknownObject';
import { Serializable } from '../../common/types/Serializable';
import { OrderedListSerialized } from './ordered-list.serialized';

export class OrderedList<
  T extends WithId & Serializable<S>,
  S extends UnknownObject,
> implements Serializable<OrderedListSerialized<S>>
{
  private items = new Map<string, OrderedListItem<T, S>>();

  constructor(
    initialItems: T[] = [],
    private notFoundMessage: string = 'ITEM_NOT_FOUND',
  ) {
    initialItems.forEach((item) => this.add(item));
  }

  public get size() {
    return this.items.size;
  }

  getItemOrder(id: string) {
    return this.items.get(id)?.getOrder();
  }

  swap(order1: number, order2: number) {
    const itemsArray = Array.from(this.items.values());
    const item1 = itemsArray.find((item) => item.getOrder() === order1);
    const item2 = itemsArray.find((item) => item.getOrder() === order2);
    if (!item1 || !item2) {
      throw new NotFoundException(this.notFoundMessage);
    }
    item1.changeOrder(order2);
    item2.changeOrder(order1);
  }

  set(item: T, order: number) {
    this.items.set(item.id, new OrderedListItem(order, item));
  }

  add(item: T, order?: number) {
    const nextOrder = order ?? this.getNextOrder();
    this.items.set(item.id, new OrderedListItem(nextOrder, item));
  }

  has(id: string) {
    return this.items.has(id);
  }

  get(id: string): T | undefined {
    return this.items.get(id)?.data;
  }

  getByOrder(order: number): T | undefined {
    return Array.from(this.items.values()).find(
      (item) => item.getOrder() === order,
    )?.data;
  }

  getNextOrder(): number {
    return this.items.size + 1;
  }

  getItems(): T[] {
    return Array.from(this.items.values()).map((item) => item.data);
  }

  changeOrder(itemId: string, newOrder: number) {
    const item = this.items.get(itemId);
    if (!item) {
      throw new NotFoundException(this.notFoundMessage);
    }
    const oldOrder = item.getOrder();
    if (oldOrder === newOrder) return;

    const itemsArray = Array.from(this.items.values());
    if (item.isMovingForward(newOrder)) {
      itemsArray
        .filter((item) => item.isBetweenMovingForward(oldOrder, newOrder))
        .forEach((item) => item.moveBackwards());
    }
    if (item.isMovingBackwards(newOrder)) {
      itemsArray
        .filter((item) => item.isBetweenMovingBackwards(oldOrder, newOrder))
        .forEach((item) => item.moveFoward());
    }

    item.changeOrder(newOrder);
  }

  delete(itemId: string) {
    const item = this.items.get(itemId);
    if (!item) {
      throw new NotFoundException(this.notFoundMessage);
    }
    this.items.delete(itemId);
    const order = item.getOrder();
    Array.from(this.items.values())
      .filter((item) => item.isAfter(order))
      .forEach((item) => item.moveBackwards());
  }

  toJSON() {
    return {
      items: Array.from(this.items.values()).map((item) => item.toJSON()),
    };
  }
}
