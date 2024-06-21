if (!process.env.IS_TS_NODE) require('module-alias/register');
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from 'src/app.module';

const PORT = Number(process.env.PORT);

async function startServer() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
    httpsOptions: {...helmet()},
    cors: {
      origin: '*',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Kapusta')
    .setDescription('The Kapusta API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}
startServer();
