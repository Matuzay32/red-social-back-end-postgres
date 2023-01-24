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
      const users = await this.repositoryUsers.find({});

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

  async findOne(id: number): Promise<any> {
    try {
      const user = await this.repositoryUsers.findOne({
        where: { user_id: id },
      });
      if (!user) {
        throw new HttpException(
          {
            message: `No se encontró el usuario con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el usuario con #ID${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const user = await this.repositoryUsers.findOne({
        where: { user_id: id },
      });
      if (!user) {
        return {
          message: `El usuario con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryUsers.remove(user);
      return {
        message: `El usuario con #ID$ ${id} ha sido eliminado`,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el usuario con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return `This action updates a #${id} user`;
    } catch (error) {}
  }
}
