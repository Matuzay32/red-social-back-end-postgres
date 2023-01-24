import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repositoryUsers: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const users = await this.repositoryUsers.find();

      if (!users.length) {
        throw new HttpException(
          {
            message: 'No hay usuarios en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return users;
    } catch (error) {
      throw new HttpException(
        {
          imposibleToFind: 'USERS_NOT_FOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
