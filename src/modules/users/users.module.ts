import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Connection } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { DatabaseModule } from '../../database/database.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'notification',
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
export class UsersModule { }
