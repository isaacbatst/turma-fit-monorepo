import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { MusclesModule } from './modules/muscles/muscles.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [MusclesModule, AdminModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
