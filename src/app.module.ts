import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllModules } from './modules';

@Module({
  imports: AllModules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
