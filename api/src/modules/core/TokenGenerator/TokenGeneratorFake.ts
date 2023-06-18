import { TokenGenerator } from './TokenGenerator';

export class TokenGeneratorFake implements TokenGenerator {
  generate(): string {
    return 'fake-token';
  }
}
