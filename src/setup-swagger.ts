import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';

export function setupSwagger(app: INestApplication): void {
  let options = new DocumentBuilder().setTitle('EC Community').setVersion(version).addBearerAuth().build();
  if (process.env.NODE_ENV === 'production') {
    options = new DocumentBuilder().setTitle('EC Community').addServer('/api').setVersion(version).addBearerAuth().build();
  }

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(`Documentation: http://localhost:${process.env.PORT}/documentation`);
}
