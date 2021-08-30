import { User } from '../../database/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('notification') private notificationQueue: Queue,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.userRepository.insert({
        lastName: 'shyam',
        firstName: 'parse',
        age: 23,
      });
    } catch (error) {
      throw error;
    }
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      await this.notificationQueue.add('notification-job', {
        data: { name: 'demo' },
      });
    } catch (error) {
      console.log(error);
    }
    // const findAll = await this.userRepository.findAndCount({
    //   where: {},
    //   withDeleted: false,
    //   skip: 0,
    //   take: 100,
    // });
    // throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    return {};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
