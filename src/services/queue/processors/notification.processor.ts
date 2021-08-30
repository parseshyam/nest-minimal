import { Process, Processor } from '@nestjs/bull';
import { Scope } from '@nestjs/common';
import { Job } from 'bull';


@Processor({ name: 'notification', scope: Scope.DEFAULT })
export class NotificationProcessor {

  @Process('notification-job')
  async processJob(job: Job<unknown>) {
    console.log("INSIDE FROM THE QUEUE", job.data)
  }

}
