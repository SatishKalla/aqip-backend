import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma/prisma.service';
import {
  HealthIndicatorResult,
  HealthReadinessResponse,
  HealthStatus,
} from './health.types';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReadiness(): Promise<HealthReadinessResponse> {
    const checks = {
      application: this.getApplicationHealth(),
      database: await this.getDatabaseHealth(),
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

  private async getDatabaseHealth(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.prismaService.isHealthy();

    return {
      status: isHealthy ? 'up' : 'down',
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
