import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeysConfigModule } from 'src/config/key.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
