import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatasourceModule } from '../core/DataSource/datasource.module';

@Module({
  imports: [DatasourceModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
