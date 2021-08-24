import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);

  if (module.hot) {
    console.log('Hot module reloaded');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
