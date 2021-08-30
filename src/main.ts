declare const module: any;
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters';
import morgan from 'morgan';
import { Queue } from 'bullmq';
import Arena from 'bull-arena';
import { QUEUES } from './common/index';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('dev')); // * for http logging
  app.useGlobalFilters(new HttpExceptionFilter()); // * for global exception handling
  const arena = Arena({
    BullMQ: Queue,
    queues: Object.values(QUEUES).map((queue) => {
      return {
        name: queue,
        hostId: queue.toUpperCase() + ' QUEUE',
        type: 'bullmq',
        redis: {
          host: 'localhost',
          port: 6379,
        },
      };
    }),
  });
  app.use('/arena', arena);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  graceShut(app);
};

const graceShut = (app: NestExpressApplication) => {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      console.log('SIGNAL CAPTURED : ', signal);
      app.close().finally(() => process.exit(0));
    });
  });
};

bootstrap();
