import { IdGenerator } from './IdGenerator';

export class IdGeneratorFake implements IdGenerator {
  id = 'fake-id';
  generate(): string {
    return this.id;
  }
  setNextId(id: string) {
    this.id = id;
  }
}
