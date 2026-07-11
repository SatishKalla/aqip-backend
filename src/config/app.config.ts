import { registerAs } from '@nestjs/config';

export interface AppConfiguration {
  apiPrefix: string;
  port: number;
}

export default registerAs('app', (): AppConfiguration => ({
  apiPrefix: 'api/v1',
  port: Number(process.env.PORT),
}));
