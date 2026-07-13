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
  database: DatabaseConfiguration;
  logLevel: LogLevel;
  port: number;
  swagger: SwaggerConfiguration;
}

export interface DatabaseConfiguration {
  url: string;
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
  database: {
    url: process.env.DATABASE_URL as string,
  },
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
