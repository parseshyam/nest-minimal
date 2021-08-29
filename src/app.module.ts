import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';
import { KeysConfigModule } from './config/key.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from "./services/cron/cron.service";

@Module({
  imports: [KeysConfigModule, ScheduleModule.forRoot(), ...AllModules],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule { }
