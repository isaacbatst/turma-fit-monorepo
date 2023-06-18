import { Module } from '@nestjs/common';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
  PRISMA_SERVICE,
} from '../../../constants/tokens';
import { AdminRepositoryPrisma } from '../../admin/repositories/admin.repository.prisma';
import { AdminSessionRepositoryPrisma } from '../../admin/repositories/admin.session.repository.prisma';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: ADMIN_REPOSITORY,
      useClass: AdminRepositoryPrisma,
    },
    {
      provide: ADMIN_SESSION_REPOSITORY,
      useClass: AdminSessionRepositoryPrisma,
    },
  ],
  exports: [PRISMA_SERVICE, ADMIN_REPOSITORY, ADMIN_SESSION_REPOSITORY],
})
export class DatasourceModule {}
