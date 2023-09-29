import { Global, Module } from '@nestjs/common';
import {
  ENCRYPTER,
  ID_GENERATOR,
  TOKEN_GENERATOR,
} from '../../constants/tokens';
import { DatasourceModule } from './DataSource/datasource.module';
import { EncrypterArgon2 } from './Encrypter/EncrypterArgon2';
import { IdGeneratorCrypto } from './IdGenerator/IdGeneratorCrypto';
import { TokenGeneratorCrypto } from './TokenGenerator/TokenGeneratorCrypto';
import { HealthController } from './Health/health.controller';

@Global()
@Module({
  imports: [DatasourceModule],
  controllers: [HealthController],
  providers: [
    {
      provide: ENCRYPTER,
      useClass: EncrypterArgon2,
    },
    {
      provide: ID_GENERATOR,
      useClass: IdGeneratorCrypto,
    },
    {
      provide: TOKEN_GENERATOR,
      useClass: TokenGeneratorCrypto,
    },
  ],
  exports: [DatasourceModule, ENCRYPTER, ID_GENERATOR, TOKEN_GENERATOR],
})
export class CoreModule {}
