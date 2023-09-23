import { TokenGenerator } from './TokenGenerator';
import crypto from 'node:crypto';

export class TokenGeneratorCrypto implements TokenGenerator {
  generate(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
