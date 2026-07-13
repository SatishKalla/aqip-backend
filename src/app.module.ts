import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { appConfig, validateEnvironment } from './config';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './persistence/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validate: validateEnvironment,
    }),
    LoggerModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => ({
        pinoHttp: {
          level: config.logLevel,
          autoLogging: true,
        },
      }),
    }),
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}
