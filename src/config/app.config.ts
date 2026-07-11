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
}

export default registerAs('app', (): AppConfiguration => ({
  apiPrefix: 'api/v1',
  logLevel: process.env.LOG_LEVEL as LogLevel,
  port: Number(process.env.PORT),
}));
