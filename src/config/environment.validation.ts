const PORT_MIN = 1;
const PORT_MAX = 65535;

interface EnvironmentVariables {
  PORT: number;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const errors: string[] = [];
  const port = validatePort(config.PORT, errors);

  if (errors.length > 0) {
    throw new Error(`Environment validation failed: ${errors.join(', ')}`);
  }

  return {
    ...config,
    PORT: port,
  };
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
