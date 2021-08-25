declare const module: any;
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan("dev")); // * for http logging
  app.useGlobalFilters(new HttpExceptionFilter()); // * for global exception handling

  await app.listen(3000);

  if (module.hot) {
    console.log('Hot module reloaded');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
