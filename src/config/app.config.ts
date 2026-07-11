import { registerAs } from '@nestjs/config';

export const logLevels = [
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'silent',
] as const;

export type LogLevel = (typeof logLevels)[number];

export interface AppConfiguration {
  apiPrefix: string;
  logLevel: LogLevel;
  port: number;
  swagger: SwaggerConfiguration;
}

export interface SwaggerConfiguration {
  description: string;
  enabled: boolean;
  path: string;
  title: string;
  version: string;
}

export default registerAs('app', (): AppConfiguration => ({
  apiPrefix: 'api/v1',
  logLevel: process.env.LOG_LEVEL as LogLevel,
  port: Number(process.env.PORT),
  swagger: {
    description: 'AQIP Backend API documentation',
    enabled: process.env.SWAGGER_ENABLED === 'true',
    path: 'api/docs',
    title: 'AQIP Backend API',
    version: '1.0',
  },
}));
