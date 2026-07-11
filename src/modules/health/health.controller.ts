import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthReadinessResponse } from './health.types';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getReadiness(): HealthReadinessResponse {
    return this.healthService.getReadiness();
  }
}
