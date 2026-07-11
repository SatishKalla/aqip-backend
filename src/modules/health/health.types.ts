export type HealthIndicatorStatus = 'up' | 'down';

export type HealthStatus = 'ok' | 'error';

export interface HealthIndicatorResult {
  status: HealthIndicatorStatus;
}

export interface HealthReadinessResponse {
  status: HealthStatus;
  timestamp: string;
  checks: Record<string, HealthIndicatorResult>;
}
