import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Connection } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { DatabaseModule } from '../../database/database.module';
import { QUEUES } from '../../common/index';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: QUEUES.NOTIFICATION_QUEUE,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: ['DATABASE_CONNECTION'],
    },
    UsersService,
  ],
})
export class UsersModule {}
