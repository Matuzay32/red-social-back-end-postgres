import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private repositryProfile: Repository<Profile>,
  ) {}
  async create(createProfileDto: CreateProfileDto): Promise<any> {
    const { name } = createProfileDto;
    try {
      const found = await this.repositryProfile.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El profile ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositryProfile.save(createProfileDto);
      return {
        message: `El profile ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el profile con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.repositryProfile.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay profiles en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los profiles',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const profile = await this.repositryProfile.findOne({
        where: { gander_id: id },
      });
      if (!profile) {
        throw new HttpException(
          {
            message: `No se encontró el profile con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return profile;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el profile con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const profile = await this.repositryProfile.findOne({
        where: { gander_id: id },
      });
      if (!profile) {
        throw new HttpException(
          {
            message: `El profile con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(profile, updateProfileDto);
      await this.repositryProfile.save(updatedUser);
      return {
        message: `El profile con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el profile con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const profile = await this.repositryProfile.findOne({
        where: { gander_id: id },
      });
      if (!profile) {
        return {
          message: `El profile con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositryProfile.remove(profile);
      return {
        message: `El profile con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el profile con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
