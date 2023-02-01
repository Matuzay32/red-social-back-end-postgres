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
    @InjectRepository(Profile) private repositoryProfile: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    try {
      const profiles = await this.repositoryProfile.find({
        relations: ['country', 'gender', 'sentimental', 'typeAcount'],
      });

      if (!profiles.length) {
        throw new HttpException(
          {
            message: 'No hay profiles en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return profiles;
    } catch (error) {
      throw new HttpException(
        { message: 'hubo un error al intentar encontrar el profile' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const profile = await this.repositoryProfile.findOne({
        where: { profile_id: id },
        relations: ['country', 'gender', 'user', 'sentimental', 'typeAcount'],
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
      const profile = await this.repositoryProfile.findOne({
        where: { profile_id: id },
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
      await this.repositoryProfile.save(updatedUser);
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
      const profile = await this.repositoryProfile.findOne({
        where: { profile_id: id },
      });
      if (!profile) {
        return {
          message: `El profile con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryProfile.remove(profile);
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
