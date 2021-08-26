declare const module: any;
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import * as morgan from 'morgan';


const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan("dev")); // * for http logging
  app.useGlobalFilters(new HttpExceptionFilter()); // * for global exception handling
  await app.listen(3000);
  if (module.hot) {
    console.log('Hot module reloaded');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  graceShut(app)
}

const graceShut = (app: NestExpressApplication) => {
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log("SIGNAL CAPTURED :", signal);
      app
        .close()
        .then(() => process.exit(0))
        .catch(console.log)
    });
  })
}

bootstrap();



