import { Process, Processor } from '@nestjs/bull';
import { Scope } from '@nestjs/common';
import { Job } from 'bull';
import { NotificationService } from './notification.service';
import { QUEUES } from '../../common';

@Processor({ name: QUEUES.NOTIFICATION_QUEUE, scope: Scope.DEFAULT })
export class NotificationProcessor {
  constructor(private readonly pushService: NotificationService) {}

  @Process('notification-job')
  async processJob(job: Job<unknown>) {
    console.log(job?.data);
    const token = 'demo-token';
    const message = 'demo-token';
    const payload = {};
    // this.pushService.sendMessage(token, message, payload)
  }
}
