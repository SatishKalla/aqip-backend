import { Injectable } from '@nestjs/common';
import {
  HealthIndicatorResult,
  HealthReadinessResponse,
  HealthStatus,
} from './health.types';

@Injectable()
export class HealthService {
  getReadiness(): HealthReadinessResponse {
    const checks = {
      application: this.getApplicationHealth(),
    };

    return {
      status: this.resolveStatus(checks),
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  private getApplicationHealth(): HealthIndicatorResult {
    return {
      status: 'up',
    };
  }

  private resolveStatus(
    checks: Record<string, HealthIndicatorResult>,
  ): HealthStatus {
    const isReady = Object.values(checks).every(
      (check) => check.status === 'up',
    );

    return isReady ? 'ok' : 'error';
  }
}
