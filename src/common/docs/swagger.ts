import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from '../../config/app.config';

export function setupSwagger(
  app: INestApplication,
  config: SwaggerConfiguration,
): void {
  if (!config.enabled) {
    return;
  }

  const documentConfig = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup(config.path, app, document);
}
