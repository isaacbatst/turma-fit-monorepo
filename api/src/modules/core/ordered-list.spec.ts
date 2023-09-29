import { OrderedList, OrderedListItem } from './ordered-list';

class TestItem implements OrderedListItem {
  id: string;
  order: number;

  constructor(id: string, order: number) {
    this.id = id;
    this.order = order;
  }

  getOrder(): number {
    return this.order;
  }
  changeOrder(newOrder: number): void {
    this.order = newOrder;
  }
}

describe('Ordered List', () => {
  let items: TestItem[];

  beforeEach(() => {
    items = [new TestItem('1', 1), new TestItem('2', 2), new TestItem('3', 3)];
  });

  it('should reorder 2 items', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('1', 2);
    expect(orderedList.getById('1')?.order).toBe(2);
    expect(orderedList.getById('2')?.order).toBe(1);
    expect(orderedList.getById('3')?.order).toBe(3);
  });

  it('should reorder backwards 2 items', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('2', 1);

    expect(orderedList.getById('1')?.order).toBe(2);
    expect(orderedList.getById('2')?.order).toBe(1);
    expect(orderedList.getById('3')?.order).toBe(3);
  });

  it('should reorder all items changing 1 to 3', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('1', 3);

    expect(orderedList.getById('1')?.order).toBe(3);
    expect(orderedList.getById('2')?.order).toBe(1);
    expect(orderedList.getById('3')?.order).toBe(2);
  });

  it('should reorder all items changing 3 to 1', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('3', 1);

    expect(orderedList.getById('1')?.order).toBe(2);
    expect(orderedList.getById('2')?.order).toBe(3);
    expect(orderedList.getById('3')?.order).toBe(1);
  });

  it('should get next order', () => {
    const orderedList = new OrderedList(items);
    expect(orderedList.getNextOrder()).toBe(4);
  });
});
