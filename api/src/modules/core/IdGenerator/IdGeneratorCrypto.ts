import { IdGenerator } from './IdGenerator';
import crypto from 'node:crypto';

export class IdGeneratorCrypto implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
