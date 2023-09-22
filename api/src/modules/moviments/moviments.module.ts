import { Module } from '@nestjs/common';
import { MovimentsService } from './moviments.service';
import { MovimentsController } from './moviments.controller';

@Module({
  controllers: [MovimentsController],
  providers: [MovimentsService],
})
export class MovimentsModule {}
