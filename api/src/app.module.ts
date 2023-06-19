import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CoreModule } from './modules/core/core.module';
import { MusclesModule } from './modules/muscles/muscles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, MusclesModule, AdminModule, CoreModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
