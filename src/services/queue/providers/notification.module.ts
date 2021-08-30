import { Module } from '@nestjs/common';
import { NotificationProvider } from './notification.provider';

@Module({
  exports: [NotificationProvider],
  providers: [NotificationProvider],
})
export class NotificationModule {}
