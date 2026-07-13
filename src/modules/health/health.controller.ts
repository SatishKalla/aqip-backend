import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { HealthService } from './health.service';
import type { Response } from 'express';
import type { HealthReadinessResponse } from './health.types';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getReadiness(
    @Res({ passthrough: true }) response: Response,
  ): Promise<HealthReadinessResponse> {
    const readiness = await this.healthService.getReadiness();
    const statusCode =
      readiness.status === 'ok'
        ? HttpStatus.OK
        : HttpStatus.SERVICE_UNAVAILABLE;

    response.status(statusCode);

    return readiness;
  }
}
