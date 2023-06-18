import { Encrypter } from './Encrypter';

export class EncrypterFake implements Encrypter {
  isCorrect = true;
  async encrypt(value: string): Promise<string> {
    return 'hash';
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return this.isCorrect;
  }
}
