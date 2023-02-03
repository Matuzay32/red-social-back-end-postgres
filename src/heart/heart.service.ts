import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './entities/heart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeartService {
  constructor(
    @InjectRepository(Heart) private repositoryHeart: Repository<Heart>,
  ) {}
  async create(createHeartDto: CreateHeartDto): Promise<any> {
    // const { name } = createHeartDto;
    try {
      const found = await this.repositoryHeart.findOne({
        // where: { name: name },
      });
      if (found) {
        return {
          message: `El me gusta ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositoryHeart.save(createHeartDto);
      return {
        message: `El me gusta ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el me gusta con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.repositoryHeart.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay  me gustaes en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los me gusta',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const country = await this.repositoryHeart.findOne({
        where: { heart_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `No se encontró el me gusta con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el me gusta con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateHeartDto: UpdateHeartDto): Promise<any> {
    try {
      const country = await this.repositoryHeart.findOne({
        where: { heart_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `El me gusta con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(country, updateHeartDto);
      await this.repositoryHeart.save(updatedUser);
      return {
        message: `El me gusta con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el me gusta con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const country = await this.repositoryHeart.findOne({
        where: { heart_id: id },
      });
      if (!country) {
        return {
          message: `El me gusta con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryHeart.remove(country);
      return {
        message: `El me gusta con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el me gusta con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
