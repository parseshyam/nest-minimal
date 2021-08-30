import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

import { InjectQueue, } from '@nestjs/bull';

@Injectable()
export class NotificationProvider {
  constructor(@InjectQueue('notification') private notificationQueue: Queue) {
    console.log("CONSTRUCTOR IS CALLED FROM NotificationProvider");
    this.dispatchNotification()
  }
  async dispatchNotification(data = {}) {
    try {
      const addedJob = await this.notificationQueue.add('notification-job', { foo: 'bar', })
      console.log(addedJob.id, "JOB ADDED")
    } catch (error) {
      console.log(error)
    }
  }
}
