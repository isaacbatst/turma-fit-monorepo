import { Global, Module } from '@nestjs/common';
import {
  ENCRYPTER,
  ID_GENERATOR,
  TOKEN_GENERATOR,
} from '../../constants/tokens';
import { EncrypterArgon2 } from './Encrypter/EncrypterArgon2';
import { IdGeneratorFake } from './IdGenerator/IdGeneratorFake';
import { TokenGeneratorFake } from './TokenGenerator/TokenGeneratorFake';

@Global()
@Module({
  providers: [
    {
      provide: ENCRYPTER,
      useClass: EncrypterArgon2,
    },
    {
      provide: ID_GENERATOR,
      useClass: IdGeneratorFake,
    },
    {
      provide: TOKEN_GENERATOR,
      useClass: TokenGeneratorFake,
    },
  ],
  exports: [ENCRYPTER, ID_GENERATOR, TOKEN_GENERATOR],
})
export class CoreModule {}
