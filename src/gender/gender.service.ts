import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender) private repositryGender: Repository<Gender>,
  ) {}

  async create(createGenderDto: CreateGenderDto): Promise<any> {
    const { name } = createGenderDto;
    try {
      const found = await this.repositryGender.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El genero ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositryGender.save(createGenderDto);
      return {
        message: `El genero ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el genero con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.repositryGender.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay generos en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los generos',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const country = await this.repositryGender.findOne({
        where: { gander_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `No se encontró el genero con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el genero con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateGenderDto: UpdateGenderDto): Promise<any> {
    try {
      const country = await this.repositryGender.findOne({
        where: { gander_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `El genero con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(country, updateGenderDto);
      await this.repositryGender.save(updatedUser);
      return {
        message: `El genero con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el genero con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const country = await this.repositryGender.findOne({
        where: { gander_id: id },
      });
      if (!country) {
        return {
          message: `El genero con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositryGender.remove(country);
      return {
        message: `El genero con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el genero con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
