import { IdGenerator } from './IdGenerator';

export class IdGeneratorFake implements IdGenerator {
  id = 'fake-id';
  generate(): string {
    return this.id;
  }
}
