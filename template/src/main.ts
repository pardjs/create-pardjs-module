import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@pardjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap()
  .then(() => {
    logger.info('bootstrap successfully');
  })
  .catch(err => {
    logger.error('bootstrap error', { err });
  });
