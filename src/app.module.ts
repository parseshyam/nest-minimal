import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';
import { KeysConfigModule } from './config/key.module';
import { KeysService } from './config/key.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './services/cron/cron.service';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from './services/queue/notification.processor';
import { NotificationService } from './services/queue/notification.service';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    KeysConfigModule,
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      inject: [KeysService],
      useFactory: ({ KEYS: { REDIS } }: KeysService) => ({
        redis: {
          host: REDIS.REDIS_HOST,
          port: REDIS.REDIS_PORT,
        },
      }),
    }),
    ...AllModules,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
    NotificationProcessor,
    NotificationService,
  ],
})
export class AppModule {}
