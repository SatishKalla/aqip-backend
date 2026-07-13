import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { setupSwagger } from './common/docs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { globalValidationPipe } from './common/pipes/validation.pipe';
import { appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.setGlobalPrefix(config.apiPrefix);
  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app, config.swagger);

  await app.listen(config.port);
}
void bootstrap();
