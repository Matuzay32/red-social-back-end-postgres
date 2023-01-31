import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private repositoryFriend: Repository<Friend>,
  ) {}
  async create(createFriendDto: CreateFriendDto): Promise<any> {
    const { name } = createFriendDto;
    try {
      const found = await this.repositoryFriend.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El friend ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositoryFriend.save(createFriendDto);
      return {
        message: `El friend ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el friend con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.repositoryFriend.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay friendes en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los friendes',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const friend = await this.repositoryFriend.findOne({
        where: { friend_id: id },
      });
      if (!friend) {
        throw new HttpException(
          {
            message: `No se encontró el friend con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return friend;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el friend con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateFriendDto: UpdateFriendDto): Promise<any> {
    try {
      const friend = await this.repositoryFriend.findOne({
        where: { friend_id: id },
      });
      if (!friend) {
        throw new HttpException(
          {
            message: `El friend con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(friend, updateFriendDto);
      await this.repositoryFriend.save(updatedUser);
      return {
        message: `El friend con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el friend con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const friend = await this.repositoryFriend.findOne({
        where: { friend_id: id },
      });
      if (!friend) {
        return {
          message: `El friend con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryFriend.remove(friend);
      return {
        message: `El friend con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el friend con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
