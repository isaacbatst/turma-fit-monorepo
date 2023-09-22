import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { MusclesModule } from './modules/muscles/muscles.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { MovimentsModule } from './modules/moviments/moviments.module';

@Module({
  imports: [
    AuthModule,
    MusclesModule,
    AdminModule,
    EquipmentsModule,
    CoreModule,
    MovimentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
