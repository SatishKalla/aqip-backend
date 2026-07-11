import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, validateEnvironment } from './config';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validate: validateEnvironment,
    }),
    HealthModule,
  ],
})
export class AppModule {}
