import {
  Controller,
  Get
} from '@nestjs/common';
import { Public } from '../../auth/public.decorator';

@Controller('health')
export class HealthController {
  @Public()
  @Get('live')
  live() {
    return { live: true };
  }
}
