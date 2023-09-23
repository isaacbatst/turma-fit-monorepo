import * as argon2 from 'argon2';
import { Encrypter } from './Encrypter';

export class EncrypterArgon2 implements Encrypter {
  encrypt(value: string): Promise<string> {
    return argon2.hash(value);
  }
  compare(value: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, value);
  }
}
