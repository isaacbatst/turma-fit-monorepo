import { OrderedList } from './ordered-list';

class TestItem {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  toJSON() {
    return {
      id: this.id,
    };
  }
}

describe('Ordered List', () => {
  let items: TestItem[];

  beforeEach(() => {
    items = [new TestItem('1'), new TestItem('2'), new TestItem('3')];
  });

  it('should reorder 2 items', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('1', 2);
    expect(orderedList.getItemOrder('1')).toBe(2);
    expect(orderedList.getItemOrder('2')).toBe(1);
    expect(orderedList.getItemOrder('3')).toBe(3);
  });

  it('should reorder backwards 2 items', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('2', 1);

    expect(orderedList.getItemOrder('1')).toBe(2);
    expect(orderedList.getItemOrder('2')).toBe(1);
    expect(orderedList.getItemOrder('3')).toBe(3);
  });

  it('should reorder all items changing 1 to 3', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('1', 3);

    expect(orderedList.getItemOrder('1')).toBe(3);
    expect(orderedList.getItemOrder('2')).toBe(1);
    expect(orderedList.getItemOrder('3')).toBe(2);
  });

  it('should reorder all items changing 3 to 1', () => {
    const orderedList = new OrderedList(items);
    orderedList.changeOrder('3', 1);

    expect(orderedList.getItemOrder('1')).toBe(2);
    expect(orderedList.getItemOrder('2')).toBe(3);
    expect(orderedList.getItemOrder('3')).toBe(1);
  });

  it('should get next order', () => {
    const orderedList = new OrderedList(items);
    expect(orderedList.getNextOrder()).toBe(4);
  });

  it('should remove item', () => {
    const orderedList = new OrderedList(items);
    orderedList.delete('2');
    expect(orderedList.getItemOrder('1')).toBe(1);
    expect(orderedList.getItemOrder('2')).toBeUndefined();
    expect(orderedList.getItemOrder('3')).toBe(2);
  });
});
