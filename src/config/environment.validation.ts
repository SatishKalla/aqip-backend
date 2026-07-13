import { LogLevel, logLevels } from './app.config';

const PORT_MIN = 1;
const PORT_MAX = 65535;

interface EnvironmentVariables {
  DATABASE_URL: string;
  LOG_LEVEL: LogLevel;
  PORT: number;
  SWAGGER_ENABLED: string;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const errors: string[] = [];
  const databaseUrl = validateRequiredString(
    config.DATABASE_URL,
    'DATABASE_URL',
    errors,
  );
  const logLevel = validateLogLevel(config.LOG_LEVEL, errors);
  const port = validatePort(config.PORT, errors);
  const swaggerEnabled = validateBooleanString(
    config.SWAGGER_ENABLED,
    'SWAGGER_ENABLED',
    errors,
  );

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors.join(', ')}`);
  }

  return {
    ...config,
    DATABASE_URL: databaseUrl,
    LOG_LEVEL: logLevel,
    PORT: port,
    SWAGGER_ENABLED: swaggerEnabled,
  };
}

function validateRequiredString(
  value: unknown,
  name: string,
  errors: string[],
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`${name} is required`);
    return '';
  }

  return value;
}

function validateBooleanString(
  value: unknown,
  name: string,
  errors: string[],
): string {
  if (value === undefined || value === null || value === '') {
    errors.push(`${name} is required`);
    return 'false';
  }

  if (value !== 'true' && value !== 'false') {
    errors.push(`${name} must be either true or false`);
    return 'false';
  }

  return value;
}

function validateLogLevel(value: unknown, errors: string[]): LogLevel {
  if (value === undefined || value === null || value === '') {
    errors.push('LOG_LEVEL is required');
    return 'info';
  }

  if (typeof value !== 'string' || !isLogLevel(value)) {
    errors.push(`LOG_LEVEL must be one of: ${logLevels.join(', ')}`);
    return 'info';
  }

  return value;
}

function isLogLevel(value: string): value is LogLevel {
  return logLevels.includes(value as LogLevel);
}

function validatePort(value: unknown, errors: string[]): number {
  if (value === undefined || value === null || value === '') {
    errors.push('PORT is required');
    return 0;
  }

  const port = Number(value);

  if (!Number.isInteger(port)) {
    errors.push('PORT must be an integer');
    return 0;
  }

  if (port < PORT_MIN || port > PORT_MAX) {
    errors.push(`PORT must be between ${PORT_MIN} and ${PORT_MAX}`);
    return 0;
  }

  return port;
}
