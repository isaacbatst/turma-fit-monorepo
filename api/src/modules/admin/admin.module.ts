import { Module } from '@nestjs/common';
import {
  ADMIN_REPOSITORY,
  ADMIN_SESSION_REPOSITORY,
} from '../../constants/tokens';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepositoryMemory } from './repositories/admin.repository.memory';
import { AdminSessionRepositoryMemory } from './repositories/admin.session.repository.memory';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: ADMIN_REPOSITORY,
      useClass: AdminRepositoryMemory,
    },
    {
      provide: ADMIN_SESSION_REPOSITORY,
      useClass: AdminSessionRepositoryMemory,
    },
  ],
})
export class AdminModule {}
