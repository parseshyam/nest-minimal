import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';
import { KeysConfigModule } from './config/key.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './services/cron/cron.service';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from './services/queue/processors/notification.processor';
import { NotificationService } from './services/queue/processors/notification.service';
@Module({
  imports: [
    KeysConfigModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
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
