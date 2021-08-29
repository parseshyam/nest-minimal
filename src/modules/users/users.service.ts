import { User } from '../../database/entities/user.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.userRepository.insert({
        lastName: 'shyam',
        firstName: 'parse',
        age: 23
      });

      console.log("User Created", userCreated)
    } catch (error) {
      throw (error)
    }
    return 'This action adds a new user';
  }

  async findAll() {
    const findAll = await this.userRepository.findAndCount({
      where: {},
      withDeleted: false,
      skip: 0,
      take: 100
    });
    // throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    return findAll;
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
